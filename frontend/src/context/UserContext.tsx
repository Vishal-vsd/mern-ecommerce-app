import { createContext, useState } from "react";
import toast from "react-hot-toast";

export const UserContext = createContext<any>(null);

type User = {

_id:string;

name:string;

email:string;

role:string;

createdAt:string;

updatedAt:string;

}

const UserProvider = ({children}: any) => {
    const [users, setUsers] = useState<User[]>([]);
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(false);
    const [ deleteLoading, setDeleteLoading ] = useState(false);

    const fetchUsers = async ()=> {
        try {
            setLoading(true);

            const res = await fetch("http://localhost:3000/api/admin/users",
                {
                    credentials: "include"
                }
            )

            const data = await res.json();

            if(data.success){
                setUsers(data.users)
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const fetchUser = async(id:string) => {
        try {
            setLoading(true);
            const res = await fetch(`http://localhost:3000/api/admin/users/${id}`,
                {
                    credentials: "include"
                }
            )

            const data = await res.json();
            if(data.success){
                setUser(data.user);
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

      const handleDelete = async (id: string) => {
    try {
      const confirmDelete = window.confirm("Delete this user?");

      if (!confirmDelete) {
        return;
      }

      setDeleteLoading(true);

      const res = await fetch(`http://localhost:3000/api/admin/delete/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      const data = await res.json();

      if (data.success) {
        toast.success("User deleted");
        fetchUsers();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setDeleteLoading(false);
    }
  };

    return(
        <UserContext.Provider value={{
            users,
            loading,
            fetchUsers,
            deleteLoading,
            setDeleteLoading,
            fetchUser,
            user,
            setUser,
            handleDelete
        }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider;