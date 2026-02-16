import React from "react";
import TodoForm from "../components/TodoForm";
import { createFileRoute } from '@tanstack/react-router';


const MyListings = () => {
  return (
    <div>
      <h1>MyListings page!</h1>
       <TodoForm />
    </div>
  );
};

export default MyListings;

export const Route = createFileRoute('/MyListings')({
  component: MyListings,
});

