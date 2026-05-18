import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";

import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";

import { Link } from "react-router-dom";

import { Menu, X } from "lucide-react";

type NavBarProps = {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  category: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  sortOption: string;
  setSortOption: React.Dispatch<React.SetStateAction<string>>;
};

const NavBar = ({
  searchTerm,
  setSearchTerm,
  category,
  setCategory,
  sortOption,
  setSortOption,
}: NavBarProps) => {

  const { cart , clearCart}  = useContext(CartContext);
  const navigate = useNavigate();

  const { user, setUser } =
    useContext(AuthContext);

  const [menuOpen, setMenuOpen] =
    useState(false);

  const totalItems = (cart || []).reduce(
    (total: number, item: any) =>
      total + item.quantity,
    0
  );

  const handleLogout = async () => {

    try {
      
      const res = await fetch(
        "http://localhost:3000/api/auth/logout",
        {
          method: "POST",
          credentials: "include",
        }
      );

      const data = await res.json();

      if (data.success) {
        
        clearCart()
        setUser(null);
        navigate("/")
      }

    } catch (error) {

      console.log(error);

    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-lg border-b border-gray-200 shadow-sm">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">

        {/* TOP */}
        <div className="flex items-center justify-between gap-4">

          {/* LOGO */}
          <Link to="/">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">
              MyStore
            </h2>
          </Link>

          {/* DESKTOP CONTROLS */}
          <div className="hidden lg:flex items-center gap-4 flex-1 mx-8">

            {/* SEARCH */}
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) =>
                setSearchTerm(e.target.value)
              }
              className="flex-1 px-5 py-3 rounded-2xl border border-gray-200 bg-gray-50 text-gray-800 outline-none focus:ring-2 focus:ring-black transition"
            />

            {/* CATEGORY */}
            <select
              value={category}
              onChange={(e) =>
                setCategory(e.target.value)
              }
              className="px-4 py-3 rounded-2xl border border-gray-200 bg-gray-50 text-gray-700 outline-none"
            >
              <option value="all">
                All
              </option>

              <option value="electronics">
                Electronics
              </option>

              <option value="jewelery">
                Jewelery
              </option>

              <option value="men's clothing">
                Men
              </option>

              <option value="women's clothing">
                Women
              </option>
            </select>

            {/* SORT */}
            <select
              value={sortOption}
              onChange={(e) =>
                setSortOption(e.target.value)
              }
              className="px-4 py-3 rounded-2xl border border-gray-200 bg-gray-50 text-gray-700 outline-none"
            >
              <option value="default">
                Sort
              </option>

              <option value="low">
                Price: Low → High
              </option>

              <option value="high">
                Price: High → Low
              </option>
            </select>

          </div>

          {/* RIGHT SIDE */}
          <div className="hidden md:flex items-center gap-4">

            {user ? (
              <>
                <Link
                  to="/my-orders"
                  className="text-gray-700 hover:text-black transition font-medium"
                >
                  My Orders
                </Link>

                <p className="text-sm font-medium text-gray-700">
                  Hi, {user.name}
                </p>

                <button
                  onClick={handleLogout}
                  className="px-5 py-2.5 rounded-2xl bg-black text-white hover:bg-gray-800 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-black transition font-medium"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="px-5 py-2.5 rounded-2xl bg-black text-white hover:bg-gray-800 transition"
                >
                  Register
                </Link>
              </>
            )}

            {/* CART */}
            <Link to="/cart">

              <div className="px-5 py-2.5 rounded-2xl border border-gray-200 bg-gray-50 text-gray-900 font-medium hover:bg-gray-100 transition">
                Cart ({totalItems})
              </div>

            </Link>

          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() =>
              setMenuOpen(!menuOpen)
            }
            className="md:hidden"
          >
            {menuOpen ? (
              <X size={28} />
            ) : (
              <Menu size={28} />
            )}
          </button>

        </div>

        {/* MOBILE CONTROLS */}
        {menuOpen && (
          <div className="mt-6 flex flex-col gap-4 lg:hidden">

            {/* SEARCH */}
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) =>
                setSearchTerm(e.target.value)
              }
              className="w-full px-5 py-3 rounded-2xl border border-gray-200 bg-gray-50 text-gray-800 outline-none focus:ring-2 focus:ring-black"
            />

            {/* FILTERS */}
            <div className="flex gap-3">

              <select
                value={category}
                onChange={(e) =>
                  setCategory(e.target.value)
                }
                className="flex-1 px-4 py-3 rounded-2xl border border-gray-200 bg-gray-50 text-gray-700 outline-none"
              >
                <option value="all">
                  All
                </option>

                <option value="electronics">
                  Electronics
                </option>

                <option value="jewelery">
                  Jewelery
                </option>

                <option value="men's clothing">
                  Men
                </option>

                <option value="women's clothing">
                  Women
                </option>
              </select>

              <select
                value={sortOption}
                onChange={(e) =>
                  setSortOption(e.target.value)
                }
                className="flex-1 px-4 py-3 rounded-2xl border border-gray-200 bg-gray-50 text-gray-700 outline-none"
              >
                <option value="default">
                  Sort
                </option>

                <option value="low">
                  Low → High
                </option>

                <option value="high">
                  High → Low
                </option>
              </select>

            </div>

            {/* MOBILE LINKS */}
            <div className="flex flex-col gap-3 pt-3 border-t border-gray-200">

              {user ? (
                <>
                  <p className="font-medium text-gray-700">
                    Hi, {user.name}
                  </p>

                  <Link
                    to="/my-orders"
                    className="text-gray-700"
                  >
                    My Orders
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="w-full bg-black text-white py-3 rounded-2xl"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="w-full border border-gray-200 py-3 rounded-2xl text-center"
                  >
                    Login
                  </Link>

                  <Link
                    to="/register"
                    className="w-full bg-black text-white py-3 rounded-2xl text-center"
                  >
                    Register
                  </Link>
                </>
              )}

              <Link
                to="/cart"
                className="w-full border border-gray-200 py-3 rounded-2xl text-center"
              >
                Cart ({totalItems})
              </Link>

            </div>

          </div>
        )}

      </div>

    </nav>
  );
};

export default NavBar;