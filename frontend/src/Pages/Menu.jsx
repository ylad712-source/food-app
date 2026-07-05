import React, { useEffect, useState } from "react";
import "../Pages/CSS/Menu.css";
import axios from "axios";
import Item from "../Components/Item/Item";

const Menu = () => {
  const [foods, setFoods] = useState([]);
  const [category, setCategory] = useState("Breakfast");

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    fetchFoods();
  }, []);

  const fetchFoods = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/food/list");

      if (res.data.success) {
        setFoods(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // ✅ ADD TO CART (BACKEND)
  const addToCart = async (itemId) => {
    try {
      const res = await axios.post("http://localhost:4000/api/cart/add", {
        userId,
        itemId,
      });

      if (res.data.success) {
        window.dispatchEvent(new Event("cartUpdated")); // 🔥 navbar update
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="menu">

      <h1>Our Menu</h1>
      <p>Choose your favourite meal category</p>

      {/* CATEGORY */}
      <div className="category-menu">
        <button
          className={category === "Breakfast" ? "active" : ""}
          onClick={() => setCategory("Breakfast")}
        >
          Breakfast
        </button>

        <button
          className={category === "Lunch" ? "active" : ""}
          onClick={() => setCategory("Lunch")}
        >
          Lunch
        </button>

        <button
          className={category === "Dinner" ? "active" : ""}
          onClick={() => setCategory("Dinner")}
        >
          Dinner
        </button>
      </div>

      {/* ITEMS */}
      <div className="menu-products">
        <div className="row">
          {foods
            .filter((item) => item.category === category)
            .map((item) => (
              <Item
                key={item._id}
                id={item._id}
                name={item.name}
                image={item.image}
                price={item.newPrice}
                addToCart={addToCart}
              />
            ))}
        </div>
      </div>

    </div>
  );
};

export default Menu;