import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext<any>(null);

const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/auth/me", {
          credentials: "include",
        });

        const data = await res.json();

        if (data.success) {
          setUser(data.user);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchCurrentUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading, setLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
