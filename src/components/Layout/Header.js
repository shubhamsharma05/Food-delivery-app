import React from 'react';
import classes from './Header.module.css'

import mealsImage from '../../assets/meals.jpg'
import HeaderCart from './HeaderCartButton';

const Header = (props) => {
  return (
    <React.Fragment>
        <header className={classes.header}>
            <h1>Food Delivery App</h1>
          <HeaderCart onClick={props.onShowCart}/>
        </header>
        <div className={classes['main-image']}>
        <img src={mealsImage} alt='A table full of delicious food!'/>
        </div>

    </React.Fragment>
  )
}

export default Header;