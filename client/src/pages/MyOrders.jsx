import { createFileRoute } from '@tanstack/react-router'
import React from "react";


const MyOrders = () => {
  return (
    <div>
      <h1>MyOrders page</h1>
    </div>
  );
};

export default MyOrders;

export const Route = createFileRoute('/MyOrders')({
  component: MyOrders,
});