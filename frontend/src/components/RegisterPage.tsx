import {
  useContext,
  useState,
} from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import { AuthContext } from "../context/AuthContext";

const RegisterPage = () => {

  const { setUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const handleSubmit = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    try {

      const res = await fetch(
        "http://localhost:3000/api/auth/register",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          credentials: "include",

          body: JSON.stringify({
            name,
            email,
            password,
          }),
        }
      );

      const data = await res.json();

      if (data.success) {

        setUser(data.user);

        navigate("/");

      } else {

        alert(data.message);

      }

    } catch (error) {

      console.log(error);

    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 px-4">

      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-10 border border-gray-100">

        <h2 className="text-4xl font-bold text-center text-gray-900 mb-2">
          Create Account
        </h2>

        <p className="text-center text-gray-500 mb-8">
          Register to start shopping
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            className="w-full border border-gray-200 px-4 py-3 rounded-2xl outline-none focus:ring-2 focus:ring-black transition"
          />

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="w-full border border-gray-200 px-4 py-3 rounded-2xl outline-none focus:ring-2 focus:ring-black transition"
          />

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="w-full border border-gray-200 px-4 py-3 rounded-2xl outline-none focus:ring-2 focus:ring-black transition"
          />

          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-2xl hover:bg-gray-800 transition font-medium"
          >
            Register
          </button>

        </form>

        <p className="text-center text-gray-500 mt-6">

          Already have an account?{" "}

          <Link
            to="/login"
            className="text-black font-medium hover:underline"
          >
            Login
          </Link>

        </p>

      </div>

    </div>
  );
};

export default RegisterPage;