import { CartContext } from "../context/CartContext";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

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
  const { cart } = useContext(CartContext);
  const {user, setUser} = useContext(AuthContext);

  const handleLogout = async() => {
    try {
      const res = await fetch("http://localhost:3000/api/auth/logout", 
        {
          method: "POST",
          credentials: "include"
        }
      )

      const data = await res.json();
      if(data.success){
        setUser(null)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const totalItems = cart.reduce(
    (total: number, item: any) => total + item.quantity,
    0
  );

  return (
    <div className="flex items-center justify-between px-8 py-4 bg-white border-b border-gray-200 shadow-sm">

      {/* Logo */}
      <Link to="/">
        <h3 className="text-xl font-semibold text-gray-900 tracking-wide">
          MyStore
        </h3>
      </Link>

      {/* Center controls */}
      <div className="flex items-center gap-4 flex-1 mx-8">

        {/* Search */}
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 px-4 py-2 rounded-xl border border-gray-200 text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-300"
        />

        {/* Category */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-3 py-2 rounded-xl border border-gray-200 text-gray-700 bg-white focus:outline-none"
        >
          <option value="all">All</option>
          <option value="electronics">Electronics</option>
          <option value="jewelery">Jewelery</option>
          <option value="men's clothing">Men</option>
          <option value="women's clothing">Women</option>
        </select>

        {/* Sort */}
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="px-3 py-2 rounded-xl border border-gray-200 text-gray-700 bg-white focus:outline-none"
        >
          <option value="default">Sort</option>
          <option value="low">Price: Low → High</option>
          <option value="high">Price: High → Low</option>
        </select>

      </div>

      {/* Cart */}
      <div className="flex items-center gap-4">

      {user ? (
        <>
          <p className="text-sm font-medium text-gray-700">
            Hi, {user.name}
          </p>

          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-xl bg-black text-white hover:bg-gray-800 transition"
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <Link
            to="/login"
            className="text-gray-700 hover:text-black transition"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="px-4 py-2 rounded-xl bg-black text-white hover:bg-gray-800 transition"
          >
            Register
          </Link>
        </>
      )}

    </div>
      <Link to="/cart">
        <div className="px-4 py-2 rounded-xl border border-gray-200 text-gray-900 font-medium hover:bg-gray-100 transition">
          Cart ({totalItems})
        </div>
      </Link>

    </div>
  );
};

export default NavBar;