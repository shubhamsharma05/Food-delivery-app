import React, { useContext, useEffect, useState } from "react";
import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";
import CartContext from "../../store/cart-context";

const HeaderCart = (props) => {
  const [btnIsHighlighted, setIsHighlighted] = useState(false);
  const cartCtx = useContext(CartContext);

  const { items } = cartCtx;
  const numberOfCartItems =items.reduce((curNumber, items) => {
    return curNumber + items.amount;
  }, 0);



  const btnClasses = `${classes.button} ${btnIsHighlighted ? classes.bump : ""}`;

useEffect(() => {
  if(cartCtx.items.length === 0){
    return;
  }
  setIsHighlighted(true);
 
  const timer = setTimeout(() => {
    setIsHighlighted(false);
  }, 300);
  return () => {
    clearTimeout(timer);
  };
}, [items]);

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCart;
