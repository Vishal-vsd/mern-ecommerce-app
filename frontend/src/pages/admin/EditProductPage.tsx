import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useContext, useState} from "react";
import { ProductContext } from "../../context/ProductContext";
import toast from "react-hot-toast";

const EditProductPage = ()=> {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        title: "",
        price: "",
        description: "",
        image: "",
        category: "",
        discount: "",
        stock: ""
    })
    const { id } = useParams();
    const {product, loading, fetchProduct} = useContext(ProductContext);

    useEffect(()=> {
       if(id) {
            fetchProduct(id)
        }
    }, [id]);

    useEffect(()=> {
        if(product){
            setFormData({
                title:

                product.title,

                price:

                product.price,

                description:

                product.description,

                image:

                product.image,

                category:

                product.category,

                discount:

                product.discount,

                stock:

                product.stock

            })
        }
    }, [product]);

    const handleSubmit = async(e: React.FormEvent)=> {

        e.preventDefault();

        try {
            const res = await fetch(`http://localhost:3000/api/products/update/${id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    credentials: "include",
                    body: JSON.stringify(formData)
                }
            )

            const data = await res.json();

            if(data.success){
                toast.success(
                    "Updated"
                )
                navigate("/admin/products")
            } else {
                toast.error("Error updating product")
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleChange = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=> {
        setFormData({
            ...formData,
            [e.target.name] : e.target.value,
        })
    }

    if(loading){
        return (
            <div>
                Loading...
            </div>
        )
    }

    return (
        <div className="

        max-w-4xl

        mx-auto

        ">

            <h1 className="

            text-4xl

            font-bold

            mb-2

            ">

                Edit Product

            </h1>

            <p className="

            text-gray-500

            mb-10

            ">

                Update this product 

            </p>

            <form

                onSubmit={

                    handleSubmit

                }

                className="

                bg-white

                p-8

                rounded-3xl

                shadow-sm

                border

                space-y-6

                "

            >

                {/* TITLE */}

                <input

                    type="text"

                    name="title"

                    placeholder="Product title"

                    value={

                        formData.title

                    }

                    onChange={

                        handleChange

                    }

                    className="

                    w-full

                    border

                    p-4

                    rounded-xl

                    "

                />

                {/* PRICE */}

                <input

                    type="number"

                    name="price"

                    placeholder="Price"

                    value={

                        formData.price

                    }

                    onChange={

                        handleChange

                    }

                    className="

                    w-full

                    border

                    p-4

                    rounded-xl

                    "

                />

                {/* CATEGORY */}

                <input

                    type="text"

                    name="category"

                    placeholder="Category"

                    value={

                        formData.category

                    }

                    onChange={

                        handleChange

                    }

                    className="

                    w-full

                    border

                    p-4

                    rounded-xl

                    "

                />

                {/* IMAGE */}

                <input

                    type="text"

                    name="image"

                    placeholder="Image URL"

                    value={

                        formData.image

                    }

                    onChange={

                        handleChange

                    }

                    className="

                    w-full

                    border

                    p-4

                    rounded-xl

                    "

                />

                {/* DISCOUNT */}

                <input

                    type="number"

                    name="discount"

                    placeholder="Discount %"

                    value={

                        formData.discount

                    }

                    onChange={

                        handleChange

                    }

                    className="

                    w-full

                    border

                    p-4

                    rounded-xl

                    "

                />

                {/* STOCK */}

                <input

                    type="number"

                    name="stock"

                    placeholder="Stock"

                    value={

                        formData.stock

                    }

                    onChange={

                        handleChange

                    }

                    className="

                    w-full

                    border

                    p-4

                    rounded-xl

                    "

                />

                {/* DESCRIPTION */}

                <textarea

                    name="description"

                    placeholder="Description"

                    value={

                        formData.description

                    }

                    onChange={

                        handleChange

                    }

                    className="

                    w-full

                    border

                    p-4

                    rounded-xl

                    h-32

                    "

                />

                <button

                    type="submit"

                    disabled={

                        loading

                    }

                    className="

                    w-full

                    bg-black

                    text-white

                    py-4

                    rounded-xl

                    "

                >

                    {

                        loading

                            ?

                            "Updating..."

                            :

                            "Update Product"

                    }

                </button>

            </form>

        </div>
    )
}

export default EditProductPage