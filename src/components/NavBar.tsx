import { CartContext } from "../context/CartContext"
import { useContext } from "react"
import { Link } from "react-router-dom"

const NavBar = () => {
    const {cart} = useContext(CartContext)
    return (
    <div className="flex justify-between item-center py-4 px-6 bg-gray-900 text-white shadow">
        <Link to="/">
        <h3 className="text-2xl font-bold tracking-wide">My Store</h3>
        </Link>
        <Link to="/cart">
        <p className="bg-white text-black px-4 py-1 rounded-full shadow font-medium" >Cart ({cart.length})</p>
        </Link>
    </div>
    )
}

export default NavBar