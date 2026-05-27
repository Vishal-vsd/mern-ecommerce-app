import { createContext, useState } from "react";

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

    return(
        <UserContext.Provider value={{
            users,
            loading,
            fetchUsers,
            deleteLoading,
            setDeleteLoading
        }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider;