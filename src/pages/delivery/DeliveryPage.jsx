import Delivery from "@/components/screens/delivery/Delivery";
import { useApp } from "@/context/AppContext";

function DeliveryPage() {
  const { orders, loadingOrders, errorOrders } = useApp();

  console.log("ORDERS FROM CONTEXT:", orders);

  if (loadingOrders) return <h2>Загрузка заказов...</h2>;

  if (errorOrders) return <h2>Ошибка: {errorOrders}</h2>;

  return <Delivery orders={orders} />;
}

export default DeliveryPage;
