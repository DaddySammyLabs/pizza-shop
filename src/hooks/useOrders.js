import { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";

const DELIVERY_URL = "https://8b4a20fa1260a041.mokky.dev/delivery";
const ORDERS_URL = "https://8b4a20fa1260a041.mokky.dev/orders";

const DELIVERY_TIME = 10 * 1000;
// Для реальной доставки:
// const DELIVERY_TIME = 30 * 60 * 1000;

const CHECK_INTERVAL = 5000;

const useOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [errorOrders, setErrorOrders] = useState(null);

  const processingRef = useRef(new Set());
  const mountedRef = useRef(false);

  // Получение текущих заказов доставки
  const fetchOrders = useCallback(async () => {
    try {
      const { data } = await axios.get(DELIVERY_URL);

      if (mountedRef.current) {
        setOrders(data);
        setErrorOrders(null);
      }

      return data;
    } catch (error) {
      console.error("Ошибка загрузки delivery:", error);

      if (mountedRef.current) {
        setErrorOrders(error.message || "Ошибка загрузки заказов");
      }

      throw error;
    } finally {
      if (mountedRef.current) {
        setLoadingOrders(false);
      }
    }
  }, []);

  // Первоначальная загрузка
  useEffect(() => {
    mountedRef.current = true;

    fetchOrders().catch(() => {});

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

      totalPrice: Number(totalPrice),
      createdAt: Date.now(),
      delivered: false,
    };

    try {
      const { data } = await axios.post(DELIVERY_URL, newOrder);

      setOrders((prev) => [data, ...prev]);

      console.log("Заказ создан в delivery:", data);

      return data;
    } catch (error) {
      console.error(
        "Ошибка создания заказа:",
        error.response?.data || error.message,
      );

      throw error;
    }
  }, []);

  // Перенос заказа из delivery в orders
  const processOrder = useCallback(async (order) => {
    const orderId = String(order.id);

    if (processingRef.current.has(orderId)) return;

    processingRef.current.add(orderId);

    try {
      console.log("Начинаем перенос заказа:", orderId);

      // 1. Получаем историю заказов
      const { data: existingOrders } = await axios.get(ORDERS_URL);

      // 2. Проверяем наличие заказа в истории
      const existingOrder = existingOrders.find(
        (item) => String(item.sourceDeliveryId) === orderId,
      );

      // 3. Если заказа нет — создаём его
      if (!existingOrder) {
        const orderPayload = {
          sourceDeliveryId: order.id,
          items: order.items,
          totalPrice: Number(order.totalPrice),
          createdAt: order.createdAt,
          delivered: true,
        };

        const { data: savedOrder } = await axios.post(ORDERS_URL, orderPayload);

        // Проверяем подтверждение от сервера
        if (!savedOrder || savedOrder.id == null) {
          throw new Error("Сервер не подтвердил сохранение заказа");
        }

        console.log("Заказ сохранён в orders:", savedOrder);
      } else {
        console.log("Заказ уже существует в orders:", existingOrder);
      }

      // 4. Только после сохранения удаляем из delivery
      await axios.delete(`${DELIVERY_URL}/${order.id}`);

      console.log("Заказ удалён из delivery:", orderId);

      // 5. Обновляем локальное состояние
      if (mountedRef.current) {
        setOrders((prev) => prev.filter((item) => String(item.id) !== orderId));
      }
    } catch (error) {
      console.error("Ошибка переноса заказа:", {
        orderId,
        status: error.response?.status,
        response: error.response?.data,
        message: error.message,
      });
    } finally {
      processingRef.current.delete(orderId);
    }
  }, []);

  // Автоматическая проверка доставки
  useEffect(() => {
    let active = true;
    let checking = false;

    const checkDelivery = async () => {
      if (!active || checking) return;

      checking = true;

      try {
        // Получаем актуальные заказы с сервера
        const { data: deliveryOrders } = await axios.get(DELIVERY_URL);

        if (!active) return;

        const now = Date.now();

        // Находим заказы, время доставки которых истекло
        const readyOrders = deliveryOrders.filter(
          (order) =>
            !order.delivered && now - Number(order.createdAt) >= DELIVERY_TIME,
        );

        console.log("Заказов ожидает переноса:", readyOrders.length);

        // Обрабатываем все готовые заказы
        await Promise.all(readyOrders.map((order) => processOrder(order)));

        // Обновляем список доставки
        if (active) {
          await fetchOrders();
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

    const interval = setInterval(checkDelivery, CHECK_INTERVAL);

    return () => {
      active = false;
      clearInterval(interval);
    };
  }, [processOrder, fetchOrders]);

  return {
    orders,
    loadingOrders,
    errorOrders,
    addOrder,
    fetchOrders,
  };
};

export default useOrders;
