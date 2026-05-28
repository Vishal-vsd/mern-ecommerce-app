import { useEffect, useContext} from "react";
import { ProductContext } from "../../context/ProductContext";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

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

    const handleDelete = async(id:string)=> {
        try {
            const comfirmDelete = window.confirm(
                "Delete this Product?"
            )
            if(!comfirmDelete){
                return;
            }
            
            const res = await fetch(`http://localhost:3000/api/products/delete/${id}`,
                {
                    method: "DELETE",
                    credentials: "include"
                }
            )

            const data = await res.json();

            if(data.success){
                toast.success("Deleted");
                fetchProducts()
            } else {
                toast.error(
                    data.message
                )
            }
        } catch (error) {
            console.log(error)
        }
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

src={ typeof product.image === "string"

? product.image
: product.image?.url

}

className="

w-16

h-16

object-cover

rounded-xl"

/>

<div>

<h2 className="

font-semibold

">

{

product.title

}

</h2>


<p className="

text-gray-500

">

₹{

product.price

}

</p>



<p className="

text-sm

mt-1

">

Stock:

<span className="

font-medium

ml-1

">

{

product.stock

}

</span>

</p>



<p className="

text-sm

mt-1

">

{

product.stock === 0

?

(

<span className="

text-red-500

font-medium

">

Out of Stock

</span>

)

:

product.stock < 5

?

(

<span className="

text-orange-500

font-medium

">

Low Stock

</span>

)

:

(

<span className="

text-green-600

font-medium

">

In Stock

</span>

)

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

rounded-lg"

onClick={()=> 
    navigate(
        `/admin/products/edit/${product._id}`
    )
}>

Edit

</button>

<button

className="

px-4

py-2

bg-red-50

text-red-500

rounded-lg"

onClick={()=> handleDelete(product._id)}
>

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