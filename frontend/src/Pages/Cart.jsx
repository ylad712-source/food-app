import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Pages/CSS/Cart.css";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  const userId = localStorage.getItem("userId");

  // 🔥 FETCH CART
  const fetchCart = async () => {
    try {
      if (!userId) return;

      const res = await axios.post(
        "http://localhost:4000/api/cart/get",
        { userId }
      );

      if (res.data.success) {
        setCartItems(res.data.cartData || []);
      } else {
        setCartItems([]);
      }
    } catch (error) {
      console.log(error);
      setCartItems([]);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // 🔥 SYNC FUNCTION (cart + navbar update)
  const syncCart = () => {
    fetchCart();
    window.dispatchEvent(new Event("cartUpdated"));
  };

  // ➕ INCREASE
  const increaseQuantity = async (itemId) => {
    try {
      const res = await axios.post(
        "http://localhost:4000/api/cart/increase",
        { userId, itemId }
      );

      if (res.data.success) {
        syncCart();
      }
    } catch (error) {
      console.log(error);
    }
  };

  // ➖ DECREASE
  const decreaseQuantity = async (itemId) => {
    try {
      const res = await axios.post(
        "http://localhost:4000/api/cart/decrease",
        { userId, itemId }
      );

      if (res.data.success) {
        syncCart();
      }
    } catch (error) {
      console.log(error);
    }
  };

  // ❌ REMOVE
  const removeItem = async (itemId) => {
    try {
      const res = await axios.post(
        "http://localhost:4000/api/cart/remove",
        { userId, itemId }
      );

      if (res.data.success) {
        syncCart();
      }
    } catch (error) {
      console.log(error);
    }
  };

  // 💰 TOTAL
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.newPrice * item.quantity,
    0
  );

  return (
    <div className="cart">
      <h1>Your Cart</h1>

      {cartItems.length === 0 ? (
        <h3>Your cart is empty</h3>
      ) : (
        <>
          <div className="cart-items">

            {cartItems.map((item) => (
              <div className="cart-item" key={item._id}>

                {/* IMAGE */}
                <img
                  src={`http://localhost:4000/images/${item.image}`}
                  alt={item.name}
                />

                {/* DETAILS */}
                <div className="cart-details">
                  <h3>{item.name}</h3>
                  <p>₹{item.newPrice}</p>

                  {/* QUANTITY */}
                  <div className="quantity">
                    <button onClick={() => decreaseQuantity(item._id)}>
                      -
                    </button>

                    <span>{item.quantity}</span>

                    <button onClick={() => increaseQuantity(item._id)}>
                      +
                    </button>
                  </div>
                </div>

                {/* REMOVE */}
                <button
                  className="remove-btn"
                  onClick={() => removeItem(item._id)}
                >
                  Remove
                </button>

              </div>
            ))}

          </div>

          {/* SUMMARY */}
          <div className="cart-summary">
            <h2>Total: ₹{totalPrice}</h2>

            <button
              className="checkout-btn"
              onClick={() => navigate("/checkout")}
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;