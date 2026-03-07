import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  XIcon,
} from "lucide-react";

const Navabr = () => {

  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  return (

      <nav className="">
        <div className="fixed left-0 top-0 right-0 z-100 flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white transition-all">
          {/* Desktop Menu */}
          <div className="hidden sm:flex items-center gap-4 md:gap-8 max-md:text-sm text-gray-800">
            <Link to="/" onClick={() => scrollTo(0, 0)}>
              首頁
            </Link>
            <Link to="/marketplace" onClick={() => scrollTo(0, 0)}>
              交易市集
            </Link>
             <Link
              to={"/aution"}
            >
              競拍區
            </Link>
            <Link
              to={"/messages"}
            >
              聊天室
            </Link>
            <Link
              to={"/my-listings"}
            >
              我的賣場
            </Link>
            <Link
              to="/memberRegisterPage"
            >
              會員專區
            </Link>
          </div>
    
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
            <Link to="/messages">
              聊天室
            </Link>
            <Link to="/my-listings" >
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
  );
};

export default Navabr;
