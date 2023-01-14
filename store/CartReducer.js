export const defaultCartState = {
  cartItems: [],
  totalAmount: 0,
};


const setLocalStorage = (updatedItems) => {
  localStorage.setItem("cartItems", JSON.stringify(updatedItems));
};

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    console.log(state.cartItems)
    const existingItemIndex = state.cartItems.findIndex(
      (item) => item.slug.current === action.item.slug.current
    );
    let existingItem = state.cartItems[existingItemIndex];
    let updatedItems;
    if (existingItem) {
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity + action.qty,
      };
      updatedItems = state.cartItems;
      updatedItems[existingItemIndex] = updatedItem;
    } else {
      updatedItems = state.cartItems.concat({
        ...action.item,
        quantity: action.qty,
      });
    }
    const totalAmount = state.totalAmount + action.item.price * action.qty;
    setLocalStorage(updatedItems);
    return {
      cartItems: updatedItems,
      totalAmount,
    };
  }
  if (action.type === "CHANGE_QUANTITY") {
    const isPlus = action.value === "INC";
    console.log(action.item);
    
    const clickedItemIndex = state.cartItems.findIndex(
      (item) => item.slug.current === action.item.slug.current
    );
    const clickedItem = state.cartItems[clickedItemIndex];
    const isTrue = clickedItem.quantity === 1;
    const updatedItem = {
      ...clickedItem,
      quantity: isPlus
        ? clickedItem.quantity + 0.5
        : isTrue
        ? 1
        : clickedItem.quantity - 0.5,
    };
    const totalAmount = isTrue
      ? state.totalAmount
      : isPlus
      ? state.totalAmount + action.item.price
      : state.totalAmount - action.item.price;
    let updatedItems = state.cartItems;
    updatedItems[clickedItemIndex] = updatedItem;
    setLocalStorage(updatedItems);
    return {
      cartItems: updatedItems,
      totalAmount,
    };
  }
  if (action.type === "REMOVE") {
    let updatedItems = state.cartItems.filter(
      (item) => item.slug.current !== action.item.slug.current
    );
    const totalAmount =
      state.totalAmount - action.item.price * action.item.quantity;
    setLocalStorage(updatedItems);
    return {
      cartItems: updatedItems,
      totalAmount,
    };
  }
  if (action.type === "RESET") {
    localStorage.removeItem("cartItems");
    return defaultCartState;
  }

  return defaultCartState;
};

export default cartReducer;
