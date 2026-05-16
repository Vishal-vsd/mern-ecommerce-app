import { useEffect, useContext} from "react";
import { ProductContext } from "../../context/ProductContext";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AdminProducts = () => {
    const {loading, products, fetchProducts} = useContext(ProductContext);
    const navigate = useNavigate();

    useEffect(()=> {
        fetchProducts()
    },[])

    if(loading){
        return (
            <div>
                Loading...
            </div>
        )
    }
    
return(

<div className="w-full">

{/* TOP */}

<div className="

flex

justify-between

items-center

mb-10">

<div>

<h1 className="

text-4xl

font-bold">

Products

</h1>

<p className="

text-gray-500

mt-2">

Manage products

</p>

</div>

<button

onClick={()=>

navigate(

"/admin/products/add"

)

}

className="

flex

items-center

gap-2

bg-black

text-white

px-5

py-3

rounded-xl

hover:opacity-90

">

<Plus size={18}/>

Add Product

</button>

</div>

{/* PRODUCTS */}

<div className="

bg-white

rounded-3xl

border

overflow-hidden">

{

products.map(

(product:any)=>(

<div

key={

product._id

}

className="

flex

justify-between

items-center

p-5

border-b

">

<div className="

flex

items-center

gap-5">

<img

src={

product.image

}

className="

w-16

h-16

object-cover

rounded-xl"

/>

<div>

<h2 className="

font-semibold">

{

product.title

}

</h2>

<p className="

text-gray-500">

₹{

product.price

}

</p>

</div>

</div>

<div className="

flex

gap-3">

<button

className="

px-4

py-2

bg-gray-100

rounded-lg">

Edit

</button>

<button

className="

px-4

py-2

bg-red-50

text-red-500

rounded-lg">

Delete

</button>

</div>

</div>

))

}

</div>

</div>

)
}

export default AdminProducts;