import { Package, ShoppingBag, Users, DollarSign } from "lucide-react";

import { useState, useEffect } from "react";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    products: 0,
    users: 0,
    orders: 0,
    revenue: 0,
  });

  const [loading, setLoading] = useState(false);

  const [recentOrders, setRecentOrders] = useState<any[]>([]);

  const [analytics, setAnalytics] = useState<any[]>([]);

  const fetchAnalytics = async() => {
    try {

      const res = await fetch("http://localhost:3000/api/admin/analytics",
        {
          credentials:"include"
        }
      )

      const data = await res.json();

      if(data.success){
        const formatted = data.sales.map((item: any)=> (
          {
            month: new Date(
              0, 
              item._id.month -1
            ).toLocaleString(
              "default",
              {
                month: "short"
              }
            ),
            revenue: item.revenue,
            orders: item.orders
          }
        ))

        setAnalytics(formatted);
      }
    } catch (error) {
      console.log(error)
    } 
  }
  const fetchRecentOrders = async () => {
    try {
  
      const res = await fetch("http://localhost:3000/api/admin/recent-orders", {
        credentials: "include",
      });

      const data = await res.json();
      if (data.success) {
        setRecentOrders(data.recentOrders);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchStats = async () => {
    try {
    
      const res = await fetch("http://localhost:3000/api/admin/stats", {
        credentials: "include",
      });

      const data = await res.json();

      if (data.success) {
        setStats({
          products: data.products,

          users: data.users,

          orders: data.orders,

          revenue: data.revenue,
        });
      }
    } catch (error) {
      console.log(error);
    } 
  };

  useEffect(() => {
    const loadData = async() => {
      try {
        setLoading(true);
        await Promise.all([
          fetchStats(),
          fetchRecentOrders(),
          fetchAnalytics(),
        ])
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, []);

  if(loading) {
    return(
      <div>
        Loading... 
      </div>
    )
  }

  return (
    <div
      className="

                    min-h-screen

                    bg-[#f8fafc]

                    px-12

                    py-10

                    "
    >
      {/* HEADER */}

      <div>
        <h1
          className="
                    text-5xl
                    font-bold
                    tracking-tight
                    "
        >
          Welcome Admin 👋
        </h1>

        <p
          className="
                    text-gray-500

                    mt-3

                    text-lg
                    "
        >
          Manage products, orders and users
        </p>
      </div>

      {/* STATS */}

      <div
        className="

                    grid

                    sm:grid-cols-2

                    xl:grid-cols-4

                    gap-7

                    mt-12

                    "
      >
        <div
          className="

                    bg-white

                    rounded-3xl

                    border

                    border-gray-100

                    p-8

                    shadow-sm

                    hover:shadow-md

                    transition

                    min-w-0

                    "
        >
          <div
            className="

                    flex

                    justify-between

                    items-center

                    "
          >
            <h3 className="text-gray-500">Revenue</h3>

            <DollarSign size={22} className="text-gray-400" />
          </div>

          <p
            className="

                    text-3xl

                    lg:text-4xl

                    font-bold

                    mt-6

                    leading-tight

                    break-all

                    "
          >
            ₹
            {stats.revenue.toLocaleString(
              "en-IN",

              {
                minimumFractionDigits: 0,

                maximumFractionDigits: 2,
              },
            )}
          </p>

          <p
            className="

                    text-sm

                    text-green-600

                    mt-2

                    "
          >
            Total store earnings
          </p>
        </div>
        {/* PRODUCTS */}

        <div
          className="

                    bg-white

                    rounded-3xl

                    border

                    border-gray-100

                    p-8

                    shadow-sm

                    hover:shadow-md

                    transition

                    "
        >
          <div
            className="
                    flex
                    justify-between
                    items-center"
          >
            <h3
              className="
                    text-gray-500"
            >
              Total Products
            </h3>

            <Package
              size={22}
              className="
                    text-gray-400"
            />
          </div>

          <p
            className="
                    text-5xl

                    font-bold

                    mt-6
                    "
          >
            {stats.products}
          </p>
        </div>

        {/* ORDERS */}

        <div
          className="

                    bg-white

                    rounded-3xl

                    border

                    border-gray-100

                    p-8

                    shadow-sm

                    hover:shadow-md

                    transition

                    "
        >
          <div
            className="
                    flex
                    justify-between
                    items-center"
          >
            <h3
              className="
                    text-gray-500"
            >
              Orders
            </h3>

            <ShoppingBag
              size={22}
              className="
                    text-gray-400"
            />
          </div>

          <p
            className="
                    text-5xl

                    font-bold

                    mt-6
                    "
          >
            {stats.orders}
          </p>
        </div>

        {/* USERS */}

        <div
          className="

                    bg-white

                    rounded-3xl

                    border

                    border-gray-100

                    p-8

                    shadow-sm

                    hover:shadow-md

                    transition

                    "
        >
          <div
            className="
                    flex
                    justify-between
                    items-center"
          >
            <h3
              className="
                    text-gray-500"
            >
              Users
            </h3>

            <Users
              size={22}
              className="
                    text-gray-400"
            />
          </div>

          <p
            className="
                    text-5xl

                    font-bold

                    mt-6
                    "
          >
            {stats.users}
          </p>
        </div>
      </div>

      {/* RECENT ACTIVITY */}

      <div
        className="

                    bg-white

                    rounded-3xl

                    border

                    p-8

                    mt-10

                    "
      >
        <h2
          className="

                    text-2xl

                    font-semibold

                    mb-6

                    "
        >
          Recent Activity
        </h2>

        <div
          className="

space-y-5

"
        >
          {recentOrders.length === 0 ? (
            <p
              className="

text-gray-400

text-sm

"
            >
              No recent activity
            </p>
          ) : (
            recentOrders.map((order: any) => (
              <div
                key={order._id}
                className="

flex

justify-between

items-center

pb-5

border-b

border-gray-100

last:border-none

"
              >
                <div>
                  <p
                    className="

font-semibold

text-[16px]

"
                  >
                    {order.user?.name || "Unknown User"}
                  </p>

                  <p
                    className="

text-sm

text-gray-400

mt-1

"
                  >
                    {new Date(order.createdAt).toLocaleDateString(
                      "en-IN",

                      {
                        day: "numeric",

                        month: "short",

                        year: "numeric",
                      },
                    )}
                  </p>
                </div>

                <div
                  className="

text-right

"
                >
                  <p
                    className="

font-bold

"
                  >
                    ₹{order.totalPrice.toLocaleString("en-IN")}
                  </p>

                  <p
                    className="

text-xs

text-green-600

mt-1

"
                  >
                    {order.status || "Placed"}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
