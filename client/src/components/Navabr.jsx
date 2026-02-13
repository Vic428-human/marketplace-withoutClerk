import React, { useState } from "react";
import { assets } from "../assets/assets";
import { useNavigate, Link } from "react-router-dom";
import {
  BoxIcon,
  GripIcon,
  ListIcon,
  MenuIcon,
  MessageCircleMore,
  XIcon,
} from "lucide-react";
// useClerk() => allowing you to build alternatives to any Clerk Component. https://clerk.com/docs/react/reference/hooks/use-user
// useUser() => This hook provides access to the current user's User object, https://clerk.com/docs/react/reference/hooks/use-clerk
// UserButton => Shows the signed-in user's avatar. Selecting it opens a dropdown menu with account management options. https://clerk.com/docs/react/getting-started/quickstart#create-a-header-with-clerk-components
import { useUser, useClerk, UserButton } from "@clerk/clerk-react";

const Navabr = () => {
  const { isSignedIn, user, isLoaded } = useUser();
  const clerk = useClerk();

  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <div>
      <nav className="h-20">
        <div className="fixed left-0 top-0 right-0 z-100 flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white transition-all">
          {/* scroll to the top of the page           */}
          {/* <img
            onClick={() => {
              navigate("/");
              scrollTo(0, 0);
            }}
            src={assets.logo}
            alt="logo"
            className="h-15 cursor-pointer"
          /> */}
          {/* Desktop Menu */}
          <div className="hidden sm:flex items-center gap-4 md:gap-8 max-md:text-sm text-gray-800">
            <Link to="/" onClick={() => scrollTo(0, 0)}>
              首頁
            </Link>
            <Link to="/marketplace" onClick={() => scrollTo(0, 0)}>
              交易市集
            </Link>
             <Link
              to={user ? "/auctions/default" : "#"}
              onClick={() => (user ? scrollTo(0, 0) : clerk.openSignIn())}
            >
              競拍區
            </Link>
            <Link
              to={user ? "/messages" : "#"}
              onClick={() => (user ? scrollTo(0, 0) : clerk.openSignIn())}
            >
              聊天室
            </Link>
            <Link
              to={user ? "/my-listings" : "#"}
              onClick={() => (user ? scrollTo(0, 0) : clerk.openSignIn())}
            >
              我的賣場
            </Link>
          </div>
          {!user ? (
            <div>
              <button
                onClick={clerk.openSignIn}
                className="max-sm:hidden cursor-pointer px-8 py-2 bg-blue-600 hover:bg-blue-700 transition text-white rounded-full font-medium shadow-md"
              >
                Login
              </button>
              <MenuIcon
                onClick={() => setMenuOpen(true)}
                className="sm:hidden cursor-pointer"
              />
            </div>
          ) : (
            // https://clerk.com/docs/react/guides/customizing-clerk/adding-items/user-button
            <UserButton>
              <UserButton.MenuItems>
                <UserButton.Action
                  label="交易市集"
                  labelIcon={<GripIcon />}
                  size={16}
                  onClick={() => navigate("/marketplace")}
                />
              </UserButton.MenuItems>
              <UserButton.MenuItems>
                <UserButton.Action
                  label="競拍區"
                  labelIcon={<ListIcon />}
                  size={16}
                  onClick={() => navigate("/my-listings")}
                />
              </UserButton.MenuItems>
              <UserButton.MenuItems>
                <UserButton.Action
                  label="聊天室"
                  labelIcon={<MessageCircleMore />}
                  size={16}
                  onClick={() => navigate("/messages")}
                />
              </UserButton.MenuItems>
              <UserButton.MenuItems>
                <UserButton.Action
                  label="我的賣場"
                  labelIcon={<ListIcon />}
                  size={16}
                  onClick={() => navigate("/my-listings")}
                />
              </UserButton.MenuItems>
              <UserButton.MenuItems>
                <UserButton.Action
                  label="我的訂單"
                  labelIcon={<BoxIcon />}
                  size={16}
                  onClick={() => navigate("/my-orders")}
                />
              </UserButton.MenuItems>
            </UserButton>
          )}
        </div>
        {/* Mobile Menu */}
        <div
          className={`sm:hidden fixed inset-0 ${menuOpen ? "w-full" : "w-0"} overflow-hidden bg-white backdrop-blur shadow-xl rounded-lg z-[200] text-sm transition-all`}
        >
          <div className="flex flex-col items-center justify-center h-full text-xl font-semibold gap-6 p-4">
            <Link to="/" onClick={() => setMenuOpen(false) && scrollTo(0, 0)}>
              首頁
            </Link>
            <Link
              to="/marketplace"
              onClick={() => setMenuOpen(false) && scrollTo(0, 0)}
            >
              交易市集
            </Link>
            <Link to="/messages" onClick={clerk.openSignIn}>
              聊天室
            </Link>
            <Link to="/my-listings" onClick={clerk.openSignIn}>
              我的賣場
            </Link>

            <button className=" cursor-pointer px-8 py-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full">
              Login
            </button>
            <XIcon
              onClick={() => setMenuOpen(false)}
              className="absolute size-8 right-6 top-6 text-gray-500 hover:text-gray-700 cursor-pointer"
            />
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navabr;
