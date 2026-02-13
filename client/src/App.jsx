import React from "react";
import Home from "./pages/Home";
import Marketplace from "./pages/Marketplace";
import MyListings from "./pages/MyListings";
import ListingDetails from "./pages/ListingDetails";
import ManageListing from "./pages/ManageListing";
import Messages from "./pages/Messages";
import MyOrders from "./pages/MyOrders";
import Loading from "./pages/Loading";
import { Routes, Route, useLocation } from "react-router-dom";
import Navabr from "./components/Navabr";
import Aution from "./pages/Aution";

const App = () => {
  const {pathname} = useLocation(); 
  return (
    <div>
      {!pathname.includes("/admin") && <Navabr/>}
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/my-listings" element={<MyListings />} />
        <Route path="/listing/:listingId" element={<ListingDetails />} />
        <Route path="/auctions/:autionId" element={<Aution />} />
        <Route path="/crate-listing" element={<ManageListing />} />
        <Route path="/edit-listing/:id" element={<ManageListing />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/my-orders" element={<MyOrders />} />
        <Route path="/loading" element={<Loading />} />
      </Routes>
    </div>
  );
};

export default App;
