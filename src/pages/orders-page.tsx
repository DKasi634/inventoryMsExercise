// src/pages/OrdersPage.tsx
import { useEffect, useState } from "react";
import { Order } from "@/api/types";
import { axiosConnectionInstance } from "@/api/utils";
import { ENDPOINTS } from "../api/endpoints";
import OrderCard from "@/components/order-card.component";
import BaseButton from "../components/buttons/base-button.component";
import { buttonType } from "../components/buttons/base-button.component";
import { FaPlus } from "react-icons/fa";
import Spinner from "@/components/spinner.component";

const OrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axiosConnectionInstance.get(ENDPOINTS.ORDERS);
        setOrders(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load orders");
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleDelete = async (orderId: number) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      try {
        await axiosConnectionInstance.delete(`${ENDPOINTS.ORDERS}${orderId}/`);
        setOrders(orders.filter(o => o.id !== orderId));
      } catch (err) {
        console.error("Delete failed:", err);
      }
    }
  };

  if (loading) return <Spinner />;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="p-4">
      <div className="mb-4">
        <BaseButton href="/orders/new" type={buttonType.blue} className="flex items-center gap-2">
          <FaPlus /> Create New Order
        </BaseButton>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {orders.map(order => (
          <OrderCard
            key={order.id}
            order={order}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};



export default OrdersPage;