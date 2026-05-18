import { useState, } from "react"
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const AddProductPage = () => {

    const[loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: "",
        price: "",
        description: "",
        image: "",
        category: "",
        discount: "",
        stock: ""
    })


    const handleChange = async (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();

        try {
            setLoading(true);

            const res = await fetch("http://localhost:3000/api/products/create",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    credentials: "include",
                    body: JSON.stringify({
                        ...formData,
                        title: formData.title,
                        price: Number(formData.price),
                        description: formData.description,
                        image: formData.image,
                        category: formData.category,
                        discount: Number(formData.discount),
                        stock: Number(formData.stock)
                    })
                }
            )

            const data = await res.json();

            if(data.success){
                toast.success("Product added");
                navigate("/admin/products")
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong")
        } finally {
            setLoading(false)
        }
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

                Add Product

            </h1>

            <p className="

            text-gray-500

            mb-10

            ">

                Create new products for store

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

                            "Creating..."

                            :

                            "Create Product"

                    }

                </button>

            </form>

        </div>

    )
}

export default AddProductPage