/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect, useCallback } from "react";

const OrderContext = createContext();

export function OrderProvider({ children }) {
  const [orders, setOrders] = useState(() => {
    const savedOrders = localStorage.getItem("orders");
    return savedOrders ? JSON.parse(savedOrders) : [];
  });

  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);

  const createOrder = useCallback((orderData) => {
    const newOrder = {
      id: `ORD-${Date.now()}`,
      ...orderData,
      status: "confirmed",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setOrders((prevOrders) => [newOrder, ...prevOrders]);
    return newOrder;
  }, []);

  const getOrderById = useCallback((orderId) => {
    return orders.find((order) => order.id === orderId);
  }, [orders]);

  const getUserOrders = useCallback((userId) => {
    return orders.filter((order) => order.userId === userId);
  }, [orders]);

  const reorder = useCallback((orderId, addToCart) => {
    const order = orders.find((o) => o.id === orderId);
    if (order && order.items) {
      order.items.forEach((item) => {
        addToCart({ ...item, quantity: item.quantity });
      });
    }
    return order;
  }, [orders]);

  const updateOrderStatus = useCallback((orderId, status) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId
          ? { ...order, status, updatedAt: new Date().toISOString() }
          : order
      )
    );
  }, []);

  return (
    <OrderContext.Provider
      value={{
        orders,
        createOrder,
        getOrderById,
        getUserOrders,
        reorder,
        updateOrderStatus,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export function useOrders() {
  return useContext(OrderContext);
}
