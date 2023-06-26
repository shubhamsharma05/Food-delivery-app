import React, { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD") {

    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const UpdatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;

    const existingCartItem = state.items[existingCartItemIndex];
    let updatedItem;
    let updatedItems;

    if(existingCartItem ){
       const updatedItem = {
            ...existingCartItem,
            amount: existingCartItem.amount + action.item.amount
        };
        updatedItems = [...state.items]
        updatedItems[existingCartItemIndex] = updatedItem;
    }else {
        updatedItems = state.items.concat(action.item);
    }
    return {
      items: updatedItems,
      totalAmount: UpdatedTotalAmount,
    };
  }
  if(action.type === 'REMOVE'){
    const existingCartItemIndex = state.items.findIndex(
        (item) => item.id === action.id
      );
      const existingItem = state.items[existingCartItemIndex];
      const UpdatedTotalAmount = state.totalAmount - existingItem.price;
      let updatedItems;
      if(existingItem.amount === 1){
        updatedItems = state.items.filter(item =>item.id !== action.id);
      }else {
        const updatedItem = {
            ...existingItem, amount: existingItem.amount -1 
        };
      }
  }

  return defaultCartState;
};

const CartProvider = (props) => {
  const [cartState, dispatchcartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler = (item) => {
    dispatchcartAction({ type: "ADD", item: item });
  };

  const removeItemFromCartHandler = (id) => {
    dispatchcartAction({ type: "REMOVE", id: id });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
