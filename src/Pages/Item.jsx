import { Button, Card } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
const { Meta } = Card;

function Item({ item }) {
  const dispatch = useDispatch();

  const addToCart = () => {
    const payload = dispatch({
      type: "addToCart",
      payload: { ...item, quantity: 1 },
    });
    console.log(payload);
  };

  return (
    <div>
      <Card
        hoverable
        style={{ width: 200, marginTop: "30px", height: "400px" }}
        cover={
          <img
            style={{
              width: "100%",
              height: "270px",
              objectFit: "contain",
            }}
            src={item.poster}
            alt={item.brand}
          />
        }
      >
        <Meta title={item.brand ? item.brand : "Biba"} />
        <div style={{ bottom: "10px", position: "absolute" }}>
          <h4>Price: {item.price}</h4>
          {/* <h5 style={{ width: "100px" }}>Prefferd for {item.category}</h5> */}
          <Button
            type="primary"
            style={{ backgroundColor: "pink" }}
            onClick={() => addToCart()}
          >
            Add To Cart
          </Button>
        </div>
      </Card>
    </div>
  );
}
export default Item;
