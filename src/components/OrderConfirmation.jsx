import React from "react";
import styles from "./styles/OrderConfirmation.module.css";

function OrderConfirmation({ order }) {
  const orderedItems = order.items;
  // console.log(order.items[0].item.name);
  // console.log(orderedItems);
  return (
    <div>
      <h1 className={styles.thank}>Thank you for your order!</h1>
      <h2 className={styles.name}>{order.name}</h2>
      <h4 className={styles.address}>{order.address}</h4>
      <div className={styles.receipt}>
        <p className={styles.id}>Order ID: {order.id}</p>
        <p className={styles.ordered}>What You Ordered</p>
        <ul>
          {orderedItems.map((item) => (
            <li className={styles.items} key={item.item.id}>
              {item.item.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default OrderConfirmation;
