import { useMemo, useState, useContext } from "react";
import { AuthContext } from "../context/auth-context-def.js";
import { Link } from "react-router-dom";
import { MenuIcon, XIcon } from "lucide-react";
import { Loader2 } from "lucide-react";

const UserAvatar = ({ userInfo, letter }) => (
  <div className="flex-shrink-0 size-8 flex items-center justify-center rounded-full bg-indigo-600 text-white font-bold overflow-hidden shadow-sm">
    {userInfo?.imageUrl ? (
      <img
        src={userInfo.imageUrl}
        alt="profile"
        className="size-full object-cover"
      />
    ) : (
      <span className="text-sm">{letter}</span>
    )}
  </div>
);

const Navabr = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isAuthenticated, userInfo, authLoading } = useContext(AuthContext);
  const { displayName, avatarLetter } = useMemo(() => {
    if (!userInfo?.email) return { displayName: "會員", avatarLetter: "?" };
    const name = userInfo.email.split("@")[0];
    return {
      displayName: name,
      avatarLetter: name.charAt(0).toUpperCase(),
    };
  }, [userInfo]);

  if (authLoading) {
    return (
      <div className="flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-full border border-gray-200">
        <Loader2 className="size-4 animate-spin text-indigo-600" />
        <span className="text-xs font-medium text-gray-500">正在驗證...</span>
      </div>
    );
  }

  return (
    <nav className="">
      <div className="fixed left-0 top-0 right-0 z-100 flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white transition-all">
        {/* Desktop Menu */}
        <div className="hidden sm:flex items-center gap-4 md:gap-8 max-md:text-sm text-gray-800">
          <Link to="/" onClick={() => scrollTo(0, 0)}>
            首頁 Desktop
          </Link>
          <Link to="/marketplace" onClick={() => scrollTo(0, 0)}>
            交易市集
          </Link>
          <Link to="/aution">競拍區</Link>
          <Link to="/articlesList">文章列表</Link>
          <Link to="/memberRegisterPage">會員專區</Link>
          <Link to="/meeting-registration">會議報名表</Link>
        </div>
        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <div className="flex items-center gap-3 px-3 py-1 bg-green-50 rounded-full border border-green-200 hover:bg-green-100 transition-colors cursor-pointer">
              <UserAvatar userInfo={userInfo} letter={avatarLetter} />
              <span className="text-sm font-medium text-green-800 max-w-[120px] truncate">
                {displayName}
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-sm bg-gray-100 px-3 py-1 rounded-full text-gray-500 hover:bg-gray-200 transition-colors">
              <span className="filter grayscale opacity-70">👤</span>
              <span>尚未登入</span>
            </div>
          )}
          {/* Mobile Menu Icon */}
          <MenuIcon
            onClick={() => setMenuOpen(true)}
            className="sm:hidden cursor-pointer"
          />
        </div>
      </div>
      {/* Mobile Menu */}
      <div
        className={`sm:hidden fixed inset-0 ${menuOpen ? "w-full" : "w-0"} overflow-hidden bg-white backdrop-blur shadow-xl rounded-lg z-[200] text-sm transition-all`}
      >
        <div className="flex flex-col items-center justify-center h-full text-xl font-semibold gap-6 p-4">
          <Link to="/" onClick={() => setMenuOpen(false) && scrollTo(0, 0)}>
            首頁 Mobile
          </Link>
          <Link
            to="/marketplace"
            onClick={() => setMenuOpen(false) && scrollTo(0, 0)}
          >
            交易市集
          </Link>
          <Link
            to="/articlesList"
            onClick={() => setMenuOpen(false) && scrollTo(0, 0)}
          >
            文章列表
          </Link>
          <Link to="/meeting-registration" onClick={() => setMenuOpen(false)}>
            會議報名表
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
