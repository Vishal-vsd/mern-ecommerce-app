import { useContext, useEffect } from "react";
import { UserContext } from "../../context/UserContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AdminUsersPage = () => {
  const { users, loading, fetchUsers, deleteLoading, setDeleteLoading } =
    useContext(UserContext);
    const navigate = useNavigate()

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
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
  return (
    <div className="w-full">
      {/* HEADER */}

      <div
        className="

      flex

      flex-col

      md:flex-row

      justify-between

      gap-5

      md:items-center

      mb-10

      "
      >
        <div>
          <h1
            className="

          text-4xl

          font-bold

          "
          >
            Users
          </h1>

          <p
            className="

          text-gray-500

          mt-2

          "
          >
            Manage registered users
          </p>
        </div>

        <div
          className="

        bg-white

        border

        px-5

        py-3

        rounded-2xl

        text-sm

        text-gray-500

        w-fit

        "
        >
          Total Users
          <span
            className="

          ml-2

          font-semibold

          text-black

          "
          >
            {users?.length || 0}
          </span>
        </div>
      </div>

      {/* USERS */}

      <div
        className="

      bg-white

      border

      rounded-3xl

      overflow-hidden

      "
      >
        {/* TABLE HEADER */}

        <div
          className="

        hidden

        md:grid

        md:grid-cols-5

        px-8

        py-5

        border-b

        text-sm

        text-gray-500

        font-medium

        bg-gray-50

        "
        >
          <p>User</p>

          <p className="text-center">Joined</p>

          <p className="text-center">Role</p>

          <p className="text-center">Status</p>

          <p className="text-right">Actions</p>
        </div>

        {users?.map((user: any) => (
          <div
            key={user._id}
            className="

          flex

          flex-col

          gap-5

          md:grid

          md:grid-cols-5

          md:items-center

          px-6

          md:px-8

          py-6

          border-b

          hover:bg-gray-50

          transition

          "
          >
            {/* USER */}

            <div
              className="

            flex

            items-center

            gap-4
            
            min-w-0

            "
            >
              <div
                className="

            w-12

            h-12

            min-w-12

            min-h-12

            rounded-full

            bg-black

            text-white

            flex

            items-center

            justify-center

            font-bold

            text-lg

            flex-shrink-0

            shadow-sm

              "
              >
                {user.name

                  .charAt(0)

                  .toUpperCase()}
              </div>

              <div>
                <h2
                  className="

                font-semibold

                text-lg

                min-w-0

                "
                >
                  {user.name}
                </h2>

                <p
                  className="

                text-sm

                text-gray-500

                min-w-0

                truncate

                "
                >
                  {user.email}
                </p>
              </div>
            </div>

            {/* JOINED */}

            <div
              className="

            text-left

            md:text-center

            "
            >
              <p
                className="

              text-sm

              text-gray-400

              md:hidden

              "
              >
                Joined
              </p>

              <p className="font-medium">
                {new Date(user.createdAt).toLocaleDateString()}
              </p>
            </div>

            {/* ROLE */}

            <div
              className="

            flex

            justify-start

            md:justify-center

            "
            >
              <span
                className={`

              px-4

              py-2

              rounded-full

              text-sm

              font-medium

              ${
                user.role === "admin"
                  ? "bg-red-100 text-red-600"
                  : "bg-gray-100 text-gray-700"
              }

              `}
              >
                {user.role}
              </span>
            </div>

            {/* STATUS */}

            <div
              className="

            flex

            justify-start

            md:justify-center

            "
            >
              <div
                className="

              flex

              items-center

              gap-2

              text-green-600

              text-sm

              font-medium

              "
              >
                <div
                  className="

                w-2

                h-2

                rounded-full

                bg-green-500

                "
                ></div>
                Active
              </div>
            </div>

            {/* ACTIONS */}

            <div
              className="

            flex

            flex-wrap

            gap-2

            justify-start

            md:justify-end

            "
            >
              <button
              onClick={()=> navigate(`/admin/users/${user._id}`)}
                className="

              px-4

              py-2

              bg-gray-100

              rounded-xl

              hover:bg-gray-200

              text-sm

              "
              >
                View
              </button>


              <button
                disabled={deleteLoading}
                onClick={() => handleDelete(user._id)}
                className="

              px-4

              py-2

              bg-red-50

              text-red-600

              rounded-xl

              hover:bg-red-100

              text-sm

              disabled:opacity-50

              "
              >
                {deleteLoading ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminUsersPage;
