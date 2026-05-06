import { CartContext } from "../context/CartContext"
import { useContext } from "react"
import { Link } from "react-router-dom"

type NavBarProps = {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  category: string,
  setCategory: React.Dispatch<React.SetStateAction<String>>,
  sortOption: string,
  setSortOption: React.Dispatch<React.SetStateAction<String>>
};
const NavBar = ({searchTerm, setSearchTerm, category, setCategory, sortOption, setSortOption}: NavBarProps) => {
    const {cart} = useContext(CartContext)

    const totalItems = cart.reduce((total: any, item: any) => total + item.quantity, 0)
    return (
    <div className="flex justify-between items-center py-4 px-6 bg-gray-900 text-white shadow">
        <Link to="/">
        <h3 className="text-2xl font-bold tracking-wide">My Store</h3>
        </Link>
        <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mx-4 px-4 py-2 rounded-md text-black bg-white flex-1 max-w-md"
        />
        <select value={category}
                onChange={(e)=> setCategory(e.target.value)}
                className="px-3 py-2 rounded text-white"
            >
                <option value="all">All</option>
                <option value="electronics">Electronics</option>
                <option value="jewelery">Jewelery</option>
                <option value="men's clothing">Men</option>
                <option value="women's clothing">Women</option>
            </select>
        <select value={sortOption}
                onChange={(e)=> setSortOption(e.target.value)}
                className="px-3 py-2 rounded text-white"
            >
                <option value="default">Sort</option>
                <option value="low">Price: Low to High</option>
                <option value="high">Price: High to Low</option>

            </select>
        <Link to="/cart">
        <p className="bg-white text-black px-4 py-1 rounded-full shadow font-medium" >Cart ({totalItems})</p>
        </Link>
    </div>
    )
}

export default NavBar