import { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";

const DELIVERY_URL = "https://8b4a20fa1260a041.mokky.dev/delivery";
const ORDERS_URL = "https://8b4a20fa1260a041.mokky.dev/orders";

// const DELIVERY_TIME = 30 * 60 * 1000;
const DELIVERY_TIME = 10 * 1000;

// Получение заказов, ожидающих доставки
const useOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [errorOrders, setErrorOrders] = useState(null);

  const processingRef = useRef(new Set());

  // Получаем заказы из delivery
  const fetchOrders = useCallback(async () => {
    try {
      const { data } = await axios.get(DELIVERY_URL);
      setOrders(data);
      setErrorOrders(null);
    } catch (error) {
      setErrorOrders(error.message);
      console.error("Ошибка загрузки заказов:", error);
    } finally {
      setLoadingOrders(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  // Создание заказа после оформления корзины
  const addOrder = useCallback(async (cart, totalPrice) => {
    if (!cart.length) return null;

    const newOrder = {
      items: cart.map((item) => ({
        itemId: item.itemId || item.id,
        title: item.title,
        price: Number(item.price),
        imageUrl: item.imageUrl,
        quantity: item.quantity || 1,
      })),
      totalPrice,
      createdAt: Date.now(),
      delivered: false,
    };

    try {
      const { data } = await axios.post(DELIVERY_URL, newOrder);

      setOrders((prev) => [data, ...prev]);

      return data;
    } catch (error) {
      console.error("Ошибка создания заказа:", error);
      throw error;
    }
  }, []);

  // Проверка времени доставки
  useEffect(() => {
    const checkDelivery = async () => {
      const now = Date.now();

      const readyOrders = orders.filter(
        (order) =>
          !order.delivered && now - Number(order.createdAt) >= DELIVERY_TIME,
      );

      for (const order of readyOrders) {
        try {
          // 1. Меняем статус на delivered: true
          const { data: deliveredOrder } = await axios.patch(
            `${DELIVERY_URL}/${order.id}`,
            { delivered: true },
          );

          setOrders((prev) =>
            prev.map((item) => (item.id === order.id ? deliveredOrder : item)),
          );

          // 2. Проверяем, не перенесён ли заказ ранее
          const { data: existingOrders } = await axios.get(ORDERS_URL);

          const alreadyExists = existingOrders.some(
            (item) => String(item.sourceDeliveryId) === String(order.id),
          );

          // 3. Отправляем завершённый заказ в orders
          if (!alreadyExists) {
            await axios.post(ORDERS_URL, {
              sourceDeliveryId: order.id,
              items: order.items,
              totalPrice: order.totalPrice,
              createdAt: order.createdAt,
              delivered: true,
            });
          }

          // 4. Удаляем из delivery после успешного переноса
          await axios.delete(`${DELIVERY_URL}/${order.id}`);

          setOrders((prev) => prev.filter((item) => item.id !== order.id));

          console.log(`Заказ ${order.id} перенесён в orders`);
        } catch (error) {
          console.error(`Ошибка обработки заказа ${order.id}:`, error);
        }
      }
    };

    checkDelivery();

    const interval = setInterval(checkDelivery, 5000);

    return () => clearInterval(interval);
  }, [orders]);

  return {
    orders,
    loadingOrders,
    errorOrders,
    addOrder,
    fetchOrders,
  };
};

export default useOrders;
