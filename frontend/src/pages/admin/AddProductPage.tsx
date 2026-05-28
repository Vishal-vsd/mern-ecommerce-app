import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const AddProductPage = () => {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
    discount: "",
    stock: "",
  });

  const [imageFile, setImageFile] = useState<File | null>(null);

  const [imageUrl, setImageUrl] = useState("");

  const [imageTab, setImageTab] = useState<"file" | "url">("file");

  const [imagePreview, setImagePreview] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setImageFile(file);

    const reader = new FileReader();

    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };

    reader.readAsDataURL(file);
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;

    setImageUrl(url);

    setImagePreview(url);
  };
  const handleChange = async (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if(imageTab === "file" && !imageFile){
        toast.error("Please select an image file");
        return;
    }

    if(imageTab==="url" && !imageUrl) {
        toast.error("Please enter an image URL");
        return;
    }

    try {
      setLoading(true);
      let res;

      if (imageTab === "file" && imageFile) {
        const data = new FormData();

        data.append("title", formData.title);
        data.append("price", formData.price);
        data.append("description", formData.description);
        data.append("category", formData.category);
        data.append("discount", formData.discount);
        data.append("stock", formData.stock);
        data.append("image", imageFile);

        res = await fetch("http://localhost:3000/api/products/create", {
          method: "POST",
          credentials: "include",
          body: data,
        });
      } else {
        res = await fetch("http://localhost:3000/api/products/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            ...formData,
            title: formData.title,
            price: Number(formData.price),
            description: formData.description,
            image: imageUrl,
            category: formData.category,
            discount: Number(formData.discount),
            stock: Number(formData.stock),
          }),
        });
      }
      const data = await res.json();

      if (data.success) {
        toast.success("Product added");
        navigate("/admin/products");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-2">Add Product</h1>
      <p className="text-gray-500 mb-10">Create new products for store</p>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-3xl shadow-sm border space-y-6"
      >
        {/* TITLE */}
        <input
          type="text"
          name="title"
          placeholder="Product title"
          value={formData.title}
          onChange={handleChange}
          className="w-full border p-4 rounded-xl"
        />

        {/* PRICE */}
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          className="w-full border p-4 rounded-xl"
        />

        {/* CATEGORY */}
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          className="w-full border p-4 rounded-xl"
        />

        {/* IMAGE SECTION */}
        <div>
          {/* Tab Buttons */}
          <div className="flex gap-2 mb-3">
            <button
              type="button"
              // type="button" zaroori — warna form submit ho jaata
              onClick={() => {
                setImageTab("file");
                setImagePreview("");
                // tab switch pe preview clear karo
              }}
              className={`px-4 py-2 rounded-xl text-sm font-medium border transition
                            ${
                              imageTab === "file"
                                ? "bg-black text-white border-black"
                                : "bg-white text-gray-500 border-gray-200"
                            }`}
            >
              Upload File
            </button>

            <button
              type="button"
              onClick={() => {
                setImageTab("url");
                setImagePreview("");
              }}
              className={`px-4 py-2 rounded-xl text-sm font-medium border transition
                            ${
                              imageTab === "url"
                                ? "bg-black text-white border-black"
                                : "bg-white text-gray-500 border-gray-200"
                            }`}
            >
              Paste URL
            </button>
          </div>

          {/* File Upload Area */}
          {imageTab === "file" && (
            <div
              onClick={() => document.getElementById("fileInput")?.click()}
              // div click hone pe hidden file input trigger hoga
              className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center cursor-pointer hover:border-gray-400 transition"
            >
              <input
                type="file"
                id="fileInput"
                accept="image/jpeg,image/png,image/webp"
                // sirf yeh 3 formats — backend ke fileFilter se match
                onChange={handleFileChange}
                className="hidden"
                // input hide rakha — div click se trigger hoga
              />

              {imageFile ? (
                <p className="text-sm text-gray-600">
                  ✅ {imageFile.name}
                  {/* selected file ka naam dikhao */}
                </p>
              ) : (
                <p className="text-sm text-gray-400">
                  Click to upload — JPG, PNG, WEBP (max 5MB)
                </p>
              )}
            </div>
          )}

          {/* URL Input */}
          {imageTab === "url" && (
            <input
              type="text"
              placeholder="https://example.com/image.jpg"
              value={imageUrl}
              onChange={handleUrlChange}
              className="w-full border p-4 rounded-xl"
            />
          )}

          {/* Preview — dono cases mein dikhega */}
          {imagePreview && (
            <div className="mt-4 flex justify-center">
              <img
                src={imagePreview}
                alt="Preview"
                className="h-40 object-contain rounded-xl border p-2"
                onError={() => setImagePreview("")}
                // galat URL ho toh preview hatao
              />
            </div>
          )}
        </div>

        {/* DISCOUNT */}
        <input
          type="number"
          name="discount"
          placeholder="Discount %"
          value={formData.discount}
          onChange={handleChange}
          className="w-full border p-4 rounded-xl"
        />

        {/* STOCK */}
        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={formData.stock}
          onChange={handleChange}
          className="w-full border p-4 rounded-xl"
        />

        {/* DESCRIPTION */}
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border p-4 rounded-xl h-32"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white py-4 rounded-xl disabled:opacity-50"
        >
          {loading ? "Creating..." : "Create Product"}
        </button>
      </form>
    </div>
  );
};

export default AddProductPage;
