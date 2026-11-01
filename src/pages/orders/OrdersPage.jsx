import Delivery from "@/components/screens/delivery/Delivery";
import useFetch from "@/hooks/api/useFetch";

const ORDERS_URL = "https://8b4a20fa1260a041.mokky.dev/orders";

function OrdersPage() {
  const { data: orders, loading, error, refetch } = useFetch(ORDERS_URL);

  if (loading) return <h2>Загрузка заказов...</h2>;

  if (error) {
    return (
      <div>
        <h2>Ошибка загрузки заказов: {error}</h2>
        <button onClick={refetch}>Повторить</button>
      </div>
    );
  }

  //   return <Delivery orders={orders} isHistory />;
  const deliveredOrders = orders.filter((order) => order.delivered === true);

  return <Delivery orders={deliveredOrders} isHistory />;
}

export default OrdersPage;
