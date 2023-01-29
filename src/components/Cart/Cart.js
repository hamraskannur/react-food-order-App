import { useContext, useState } from 'react';
import Modal from '../UI/Modal';
import CartItem from './CartItem';
import classes from './Cart.module.css';
import CartContext from '../../store/cart-context';
import Checkout from './Checkout';


const Cart = (props) => {
  const [IsSubmitting, setIsSubmitting] = useState(true)

  const [IsCheckout, setIsCheckout] = useState(false)
  const cartCtx = useContext(CartContext);
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem(item);
  };
  const OrderHandler = () => {
    setIsCheckout(true)
  }

  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );
  const modelAction = <div className={classes.actions}>
    <button className={classes['button--alt']} onClick={props.onClose}>
      Close
    </button>
    {hasItems && <button className={classes.button} onClick={OrderHandler}>Order</button>}
  </div>
  const CheckoutSubmit = () => {
    setIsSubmitting(false)
    cartCtx.clearCart()
  }



  return (
    <div>
      {!IsSubmitting && <Modal onClose={props.onClose} >
        <p>Successfully</p>
        <button className={classes.button} onClick={props.onClose}>
          Close
        </button>
      </Modal>}
      {IsSubmitting && <Modal onClose={props.onClose}>
        {cartItems}
        <div className={classes.total}>
          <span>Total Amount</span>
          <span>{totalAmount}</span>
        </div>
        {IsCheckout && <Checkout onCancel={props.onClose} Submitting={CheckoutSubmit} />}
        {!IsCheckout && modelAction}
      </Modal>}
    </div>
  );
};

export default Cart;
