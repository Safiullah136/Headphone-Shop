import { useContext, useEffect } from "react";
import Success from "../../components/Success/Success";
import { runFireworks } from "../../lib/confetti";
import CartContext from "../../store/cart-context";

const SuccessPage = () => {
  const { reset } = useContext(CartContext);

  useEffect(() => {
    reset();
    runFireworks()
  }, []);

  return <Success />;
};

export default SuccessPage;
