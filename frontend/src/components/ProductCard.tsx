import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

const ProductCard = ({ product }: any) => {
  const { addToCart } = useContext(CartContext);

  const discountedPrice =
    product.discount > 0
      ? product.price -
        (product.price * product.discount) / 100
      : product.price;

      const imageUrl = typeof product.image ==="string"
      ? product.image
      : product.image?.url

  return (
    <div className="
    bg-white
    rounded-3xl
    border
    border-gray-100
    shadow-sm
    hover:shadow-xl
    transition-all
    duration-300
    overflow-hidden
    flex
    flex-col
    group
    ">

      <Link to={`/product/${product._id}`}>

        {/* IMAGE */}
        <div className="
        relative
        h-56
        bg-gray-50
        flex
        items-center
        justify-center
        overflow-hidden
        ">

          {product.discount > 0 && (

            <span className="
            absolute
            top-4
            left-4
            bg-red-500
            text-white
            text-xs
            px-3
            py-1
            rounded-full
            font-medium
            z-50
            ">

              {product.discount}% OFF

            </span>

          )}

          <img
            src={
              imageUrl
            }
            alt={product.title}
            className="
            h-40
            object-contain
            group-hover:scale-110
            transition-transform
            duration-300
            "
          />

        </div>


        {/* CONTENT */}
        <div className="p-5">

          <h3 className="
          text-base
          font-semibold
          text-gray-900
          line-clamp-2
          ">

            {product.title}

          </h3>

          <p className="
          text-sm
          text-gray-500
          mt-2
          line-clamp-2
          ">

            {product.description}

          </p>


          {/* PRICE */}
          <div className="mt-4">

            <p className="
            text-2xl
            font-bold
            text-black
            ">

              ₹{discountedPrice.toFixed(0)}

            </p>

            {product.discount > 0 && (

              <p className="
              text-sm
              text-gray-400
              line-through
              ">

                ₹{product.price}

              </p>

            )}

          </div>


          {/* STOCK */}
          <div className="mt-2">

            {product.stock === 0 ? (

              <p className="
              text-red-500
              text-sm
              font-medium">

                Out of stock

              </p>

            ) : product.stock < 5 ? (

              <p className="
              text-orange-500
              text-sm
              font-medium">

                Only {product.stock} left

              </p>

            ) : (

              <p className="
              text-green-600
              text-sm
              font-medium">

                In stock

              </p>

            )}

          </div>

        </div>

      </Link>


      {/* BUTTON */}
      <div className="p-5 pt-0">

        <button
          onClick={() => addToCart(product)}
          disabled={product.stock === 0}
          className="
          w-full
          bg-black
          text-white
          py-3
          rounded-2xl
          hover:bg-gray-900
          transition
          disabled:bg-gray-300
          disabled:cursor-not-allowed
          "
        >

          {product.stock === 0

            ? "Unavailable"

            : "Add to Cart"}

        </button>

      </div>

    </div>
  );
};

export default ProductCard;