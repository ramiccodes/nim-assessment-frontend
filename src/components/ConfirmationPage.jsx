import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import OrderConfirmation from "./OrderConfirmation";

function ConfirmationPage() {
  const { id } = useParams();
  const [order, setOrder] = useState();

  useEffect(() => {
    fetch(`http://localhost:3001/api/orders/${id}`)
      .then((res) => res.json())
      .then((data) => setOrder(data));
  }, []);

  return order ? <OrderConfirmation order={order} /> : null;
}

export default ConfirmationPage;
