// src/pages/OrderEdit.tsx
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Order, OrderFormValues } from "@/api/types";
import { axiosConnectionInstance } from "@/api/utils";
import { ENDPOINTS } from "../api/endpoints";
import OrderForm from "@/components/order-form.component";

const OrderEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axiosConnectionInstance.get(
          `${ENDPOINTS.ORDERS}${id}/`
        );
        setOrder(response.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  const handleSubmit = async (data: OrderFormValues) => { // Changed type
    try {
      await axiosConnectionInstance.put(`${ENDPOINTS.ORDERS}${id}/`, data);
      navigate(`/orders/${id}`);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!order) return <div>Order not found</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Order</h1>
      <OrderForm initialData={order} onSubmit={handleSubmit} />
    </div>
  );
};

export default OrderEdit;