import { useState, useContext} from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {

    const {setUser} = useContext(AuthContext)
    const navigate = useNavigate();

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const res = await fetch("http://localhost:3000/api/auth/login", 
                {   method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    credentials: "include",
                    body: JSON.stringify({
                        email,
                        password
                    })
                }
            )
            const data = await res.json();

            if(data.success){
                setUser(data.user)
                navigate("/")
            } else {
                alert(data.message)
            }

        } catch (error) {
            console.log(error);
        }
    }

        return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 px-4">

            <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-gray-100 p-10">

            {/* Heading */}
            <div className="text-center mb-8">

                <h2 className="text-4xl font-bold text-gray-900">
                Welcome Back
                </h2>

                <p className="text-gray-500 mt-2">
                Login to continue shopping
                </p>

            </div>

            {/* Form */}
            <form
                className="space-y-5"
                onSubmit={handleSubmit}
            >

                {/* Email */}
                <div>
                <label className="text-sm font-medium text-gray-700 block mb-2">
                    Email
                </label>

                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) =>
                    setEmail(e.target.value)
                    }
                    className="w-full border border-gray-200 px-4 py-3 rounded-2xl outline-none focus:ring-2 focus:ring-black transition"
                />
                </div>

                {/* Password */}
                <div>
                <label className="text-sm font-medium text-gray-700 block mb-2">
                    Password
                </label>

                <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) =>
                    setPassword(e.target.value)
                    }
                    className="w-full border border-gray-200 px-4 py-3 rounded-2xl outline-none focus:ring-2 focus:ring-black transition"
                />
                </div>

                {/* Button */}
                <button
                className="w-full bg-black text-white py-3 rounded-2xl hover:bg-gray-800 transition font-medium text-lg"
                type="submit"
                >
                Login
                </button>

            </form>

            {/* Footer */}
            <p className="text-center text-gray-500 mt-8">

                Don’t have an account?{" "}

                <span
                onClick={() => navigate("/register")}
                className="text-black font-semibold cursor-pointer hover:underline"
                >
                Register
                </span>

            </p>

            </div>

        </div>
        );
};

export default LoginPage;