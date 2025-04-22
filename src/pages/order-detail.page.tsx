import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Order } from "@/api/types";
import { axiosConnectionInstance } from "@/api/utils";
import { ENDPOINTS } from "@/api/endpoints";
import BaseButton from "@/components/buttons/base-button.component";
import { buttonType } from "@/components/buttons/base-button.component";
import { FaEdit, FaTrash } from "react-icons/fa";

const OrderDetail = () => {
  const { id } = useParams();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axiosConnectionInstance.get(
          `${ENDPOINTS.ORDERS}${id}/`
        );
        setOrder(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load order");
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      try {
        await axiosConnectionInstance.delete(`${ENDPOINTS.ORDERS}${id}/`);
        window.location.href = "/orders";
      } catch (err) {
        console.error(err);
      }
    }
  };

  if (loading) return <Spinner />;
  if (error) return <div className="p-4 text-red-500">{error}</div>;
  if (!order) return <div className="p-4">Order not found</div>;

  const total = order.products.reduce((sum, p) => sum + p.price, 0) * order.qty;

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-4">Order #{order.id}</h1>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <p className="text-sm text-gray-500">Created</p>
            <p className="font-semibold">
              {new Date(order.created_at).toLocaleDateString()}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Last Updated</p>
            <p className="font-semibold">
              {new Date(order.updated_at).toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Products</h3>
          <ul className="list-disc list-inside">
            {order.products.map(product => (
              <li key={product.id}>
                {product.name} - ${product.price.toFixed(2)}
              </li>
            ))}
          </ul>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <p className="text-sm text-gray-500">Quantity</p>
            <p className="font-semibold">{order.qty}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Total</p>
            <p className="font-semibold text-green-600">${total.toFixed(2)}</p>
          </div>
        </div>

        <div className="mb-6">
          <p className="text-sm text-gray-500">Payment Status</p>
          <span className={`px-3 py-1 rounded-full ${order.paid ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
            {order.paid ? 'Paid' : 'Unpaid'}
          </span>
        </div>

        <div className="flex space-x-4">
          <BaseButton
            type={buttonType.blue}
            href={`/orders/${id}/edit`}
            className="flex-1"
          >
            <FaEdit className="mr-2" /> Edit Order
          </BaseButton>
          <BaseButton
            type={buttonType.dark}
            clickHandler={handleDelete}
            className="flex-1"
          >
            <FaTrash className="mr-2" /> Delete Order
          </BaseButton>
        </div>
      </div>
    </div>
  );
};

const Spinner = () => (
  <div className="flex justify-center items-center h-64">
    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
  </div>
);

export default OrderDetail;