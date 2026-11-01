import { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";

const DELIVERY_URL = "https://8b4a20fa1260a041.mokky.dev/delivery";
const ORDERS_URL = "https://8b4a20fa1260a041.mokky.dev/orders";

const DELIVERY_TIME = 10 * 1000;
// const DELIVERY_TIME = 30 * 60 * 1000;

const useOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [errorOrders, setErrorOrders] = useState(null);

  const processingRef = useRef(new Set());
  const mountedRef = useRef(true);

  // Получение заказов доставки
  const fetchOrders = useCallback(async () => {
    try {
      const { data } = await axios.get(DELIVERY_URL);

      if (mountedRef.current) {
        setOrders(data);
        setErrorOrders(null);
      }
    } catch (error) {
      console.error("Ошибка загрузки delivery:", error);

      if (mountedRef.current) {
        setErrorOrders(error.message);
      }
    } finally {
      if (mountedRef.current) {
        setLoadingOrders(false);
      }
    }
  }, []);

  useEffect(() => {
    mountedRef.current = true;

    fetchOrders();

    return () => {
      mountedRef.current = false;
    };
  }, [fetchOrders]);

  // Создание заказа
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

      console.log("Создан заказ:", data);

      return data;
    } catch (error) {
      console.error("Ошибка создания заказа:", error);
      throw error;
    }
  }, []);

  // Перенос одного заказа
  const processOrder = async (order) => {
    const orderId = String(order.id);

    if (processingRef.current.has(orderId)) return;

    processingRef.current.add(orderId);

    try {
      console.log("Начинаем обработку заказа:", order.id);

      // Проверяем историю заказов
      const { data: existingOrders } = await axios.get(ORDERS_URL);

      const alreadyExists = existingOrders.some(
        (item) => String(item.sourceDeliveryId) === orderId,
      );

      // Сохраняем заказ в историю
      if (!alreadyExists) {
        const { data: savedOrder } = await axios.post(ORDERS_URL, {
          sourceDeliveryId: order.id,
          items: order.items,
          totalPrice: order.totalPrice,
          createdAt: order.createdAt,
          delivered: true,
        });

        console.log("Заказ добавлен в orders:", savedOrder);
      } else {
        console.log("Заказ уже существует в orders:", order.id);
      }

      // Удаляем из delivery
      await axios.delete(`${DELIVERY_URL}/${order.id}`);

      console.log("Заказ удалён из delivery:", order.id);

      if (mountedRef.current) {
        setOrders((prev) => prev.filter((item) => String(item.id) !== orderId));
      }
    } catch (error) {
      console.error(
        `Ошибка заказа ${order.id}:`,
        error.response?.data || error.message,
      );
    } finally {
      processingRef.current.delete(orderId);
    }
  };

  // Проверка всех заказов непосредственно через API
  useEffect(() => {
    let active = true;
    let checking = false;

    const checkDelivery = async () => {
      if (!active || checking) return;

      checking = true;

      try {
        const { data: deliveryOrders } = await axios.get(DELIVERY_URL);

        const now = Date.now();

        const readyOrders = deliveryOrders.filter(
          (order) =>
            !order.delivered && now - Number(order.createdAt) >= DELIVERY_TIME,
        );

        console.log("Заказов ожидает переноса:", readyOrders.length);

        // Обрабатываем все готовые заказы
        await Promise.all(readyOrders.map((order) => processOrder(order)));

        // Обновляем список доставки
        if (active) {
          const { data } = await axios.get(DELIVERY_URL);
          setOrders(data);
        }
      } catch (error) {
        console.error(
          "Ошибка проверки доставки:",
          error.response?.data || error.message,
        );
      } finally {
        checking = false;
      }
    };

    checkDelivery();

    const interval = setInterval(checkDelivery, 5000);

    return () => {
      active = false;
      clearInterval(interval);
    };
  }, []);

  return {
    orders,
    loadingOrders,
    errorOrders,
    addOrder,
    fetchOrders,
  };
};

export default useOrders;
