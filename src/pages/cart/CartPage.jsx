import Cart from "@/components/screens/cart/Cart";
import { useApp } from "@/context/AppContext";

function CartPage() {
  const { cart, totalPrice, changeQuantity, checkout, cartLoading } = useApp();

  if (cartLoading) return <h2>Загрузка корзины...</h2>;

  return (
    <main>
      <Cart
        cart={cart}
        totalPrice={totalPrice}
        changeQuantity={changeQuantity}
        checkout={checkout}
      />
    </main>
  );
}

export default CartPage;
