// import type React from "react";
// import { useContext, useEffect } from "react";
// import { AuthContext } from "../context/AuthContext";
// import { useLocation, useNavigate } from "react-router-dom";

// const publicRoutes = ["/productList", "/", "/cart"];

// const adminRoutes = ["/dashboard", "/products", "/users", "/orders", "/"]

// export const AuthenticatedRoute = ({
//   children,
// }: {
//   children: React.ReactNode;
// }) => {
//   const { user } = useContext(AuthContext);
//   const navigate = useNavigate();
//   const { pathname } = useLocation();

//   useEffect(() => {
//     let isUserLoggedIn = localStorage.getItem("user");

//     if (
//       !isUserLoggedIn &&
//       pathname !== "/login" &&
//       !publicRoutes.includes(pathname)
//     ) {
//       navigate("/login");
//     } else if (user) {
//       if (pathname === "/login") {
//         navigate("/");
//       } else {
//         if (user.role === "admin" && !pathname.includes("/admin")) {
//           navigate("/admin/dashboard");
//         }
//       }
//     }
//   }, [user, pathname]);

//   if (!user && pathname !== "/login") {
//     return <p>Loader...</p>;
//   }
//   return children;
// };
