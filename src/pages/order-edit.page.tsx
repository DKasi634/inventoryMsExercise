import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Order, OrderFormValues } from "@/api/types";
import { axiosConnectionInstance } from "@/api/utils";
import { ENDPOINTS } from "../api/endpoints";
import OrderForm from "@/components/order-form.component";
import Spinner from "@/components/spinner.component";

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

  const handleSubmit = async (data: OrderFormValues) => {
    try {
      await axiosConnectionInstance.put(`${ENDPOINTS.ORDERS}${id}/`, data);
      navigate(`/orders/${id}`);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div><Spinner/></div>;
  if (!order) return <div>Order not found</div>;

  // Transform order data to form values
  const initialValues: OrderFormValues = {
    paid: order.paid,
    items: order.items.map(item => ({
      product: item.product_details.id,  // Ensure this matches the API's expected format
      qty: item.qty
    }))
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Order</h1>
      <OrderForm 
        initialData={initialValues} 
        onSubmit={handleSubmit} 
      />
    </div>
  );
};

export default OrderEdit;