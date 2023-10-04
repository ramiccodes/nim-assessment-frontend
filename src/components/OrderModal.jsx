import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./styles/OrderModal.module.css";

function OrderModal({ order, setOrderModal }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleNavigateClick = (event) => {
    navigate(event, { replace: true });
  };

  const placeOrder = async () => {
    const response = await fetch("/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        phone,
        address,
        items: order
      })
    });
    if (response.status === 200) {
      const data = await response.json();
      console.log(data);
      handleNavigateClick(`/order-confirmation/${data.id}`);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = {};
    if (!name.trim()) {
      validationErrors.name = "Name is required";
    }
    if (!phone.trim()) {
      validationErrors.name = "Phone Number is required";
    }
    if (!address.trim()) {
      validationErrors.name = "Address is required";
    }

    setErrors(validationErrors);
  };
  const formatPhoneNumber = (value) => {
    if (!value) {
      return value;
    }
    const phoneNumber = value.replace(/[^\d]/g, "");
    if (phoneNumber.length < 4) {
      return phoneNumber;
    }
    if (phoneNumber.length < 7) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    }

    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(
      3,
      6
    )}-${phoneNumber.slice(6, 10)}`;
  };

  const handleInput = (event) => {
    const formattedPhoneNumber = formatPhoneNumber(event.target.value);
    setPhone(formattedPhoneNumber);
  };

  return (
    <>
      <div
        label="Close"
        className={styles.orderModal}
        onKeyPress={(e) => {
          if (e.key === "Escape") {
            setOrderModal(false);
          }
        }}
        onClick={() => setOrderModal(false)}
        role="menuitem"
        tabIndex={0}
      />
      <div className={styles.orderModalContent}>
        <h2>Place Order</h2>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="name">
              Name
              <input
                onChange={(e) => {
                  e.preventDefault();
                  setName(e.target.value);
                }}
                type="text"
                id="name"
                maxLength={10}
                required
              />
              {errors.name && <span>{errors.name}</span>}
            </label>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="phone">
              Phone
              <input
                onChange={(e) => {
                  handleInput(e);
                  console.log(phone);
                }}
                value={phone}
                id="phone"
                required
              />
              {errors.phone && <span>{errors.phone}</span>}
            </label>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="address">
              Address
              <input
                onChange={(e) => {
                  e.preventDefault();
                  setAddress(e.target.value);
                }}
                type="phone"
                id="address"
                required
              />
              {errors.address && <span>{errors.address}</span>}
            </label>
          </div>
        </form>

        <div className={styles.orderModalButtons}>
          <button
            className={styles.orderModalClose}
            onClick={() => setOrderModal(false)}
          >
            Close
          </button>
          <button
            onClick={() => {
              placeOrder();
            }}
            className={styles.orderModalPlaceOrder}
          >
            Place Order
          </button>
        </div>
      </div>
    </>
  );
}

export default OrderModal;
