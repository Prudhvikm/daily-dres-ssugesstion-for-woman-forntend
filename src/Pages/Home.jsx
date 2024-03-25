import React, { useEffect, useState } from "react";
import { API } from "../global";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import Item from "./Item";
import { useNavigate } from "react-router-dom";
import { Select, Space } from "antd";
import { Button, Dropdown } from "antd";
import "./Home.css";

function Home() {
  const [itemData, setItemData] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.itemShop.item);

  useEffect(() => {
    axios
      .get(`${API}/items/get-items`)
      .then((res) => {
        dispatch({ type: "hideloading" });
        setItemData(res.data);
        setFilteredItems(res.data);
      })
      .catch((err) => {
        dispatch({ type: "hideloading" });
        console.log(err);
      });
  }, []);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const items = [
    {
      value: "All",
      label: "All",
    },
    {
      value: "Summer",
      label: "Summer",
    },
    {
      value: "Rainy",
      label: "Rainy",
    },
    {
      value: "Winter",
      label: "Winter",
    },
    {
      value: "Summar-Essentials",
      label: "Summar-Essentials",
    },
    {
      value: "Winter-Essentials",
      label: "Winter-Essentials",
    },
    {
      value: "Rainy-Essentials",
      label: "Rainy-Essentials",
    },
    {
      value: "Festival & Functions Wear",
      label: "Festival & Functions Wear",
    },
    {
      value: "Inners",
      label: "Inners",
    },
  ];

  const handleChange = (e) => {
    console.log(e);

    if (e !== "All") {
      setFilteredItems(
        itemData?.filter(
          (item) => item.category?.toLowerCase() === e?.toLowerCase()
        )
      );
    } else {
      setFilteredItems(itemData);
    }
  };

  return (
    <>
      <h1 style={{ color: "pink" }}>DAILY DRESS SUGESSION</h1>
      <div style={{ height: "50px" }}>
        {" "}
        <Button
          className="btn btn-primary position-relative your-cart"
          onClick={() => navigate("/cart")}
        >
          Your Cart 🛒
          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"></span>
        </Button>
        <div>
          <Space wrap className="category" label="Category">
            Select Category:{" "}
            <Select
              className="menu-c"
              defaultValue="All"
              onChange={handleChange}
              options={items}
            />
          </Space>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "flex-start",
          marginTop: "20px",
          gap: "20px",
        }}
      >
        {filteredItems.map((item, index) => (
          <Item key={index} item={item} />
        ))}
      </div>
    </>
  );
}

export default Home;
