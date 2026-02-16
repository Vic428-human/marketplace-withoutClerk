import React from "react";
import { createFileRoute } from '@tanstack/react-router'


const ManageListing = () => {
  return (
    <div>
      <h1>ManageListing page</h1>
    </div>
  );
};

export default ManageListing;

export const Route = createFileRoute('/ManageListing')({
  component: ManageListing,
});