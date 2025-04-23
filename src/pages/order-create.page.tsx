import { useNavigate } from "react-router-dom";
import OrderForm from "@/components/order-form.component";
import { OrderFormValues } from "@/api/types";
import { axiosConnectionInstance } from "@/api/utils";
import { ENDPOINTS } from "@/api/endpoints";

const OrderCreate = () => {
  const navigate = useNavigate();

  const handleSubmit = async (data: OrderFormValues) => {
    try {
      const response = await axiosConnectionInstance.post(
        ENDPOINTS.ORDERS,
        data
      );
      navigate(`/orders/${response.data.id}`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold mb-4">Create New Order</h1>
      <OrderForm onSubmit={handleSubmit} />
    </div>
  );
};

export default OrderCreate;