// src/components/OrderCard.tsx
import { Order } from "@/api/types";
import BaseButton from "./buttons/base-button.component";
import { buttonType } from "./buttons/base-button.component";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";

interface OrderCardProps {
  order: Order;
  onDelete: (id: number) => void;
}

const OrderCard: React.FC<OrderCardProps> = ({ order, onDelete }) => {
  const total = order.products.reduce((sum, p) => sum + p.price, 0) * order.qty;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="p-4">
        <h3 className="font-semibold mb-2 text-sm">Order #{order.id}</h3>
        <div className="mb-2 text-sm">
          <span className="font-normal">Date:</span> {new Date(order.created_at).toLocaleDateString()}
        </div>
        <div className="mb-2 text-sm">
          <span className="font-normal">Total:</span> ${total.toFixed(2)}
        </div>
        <div className="mb-4 text-sm">
          <span className="font-normal">Status:</span> {order.paid ? "Paid" : "Unpaid"}
        </div>
        <div className="flex space-x-2">
          <BaseButton
            type={buttonType.clear}
            className="!text-xs !font-normal !px-4 !py-2 gap-2"
            href={`/orders/${order.id}`}
          >
            <FaEye /> View
          </BaseButton>
          <BaseButton
            type={buttonType.green}
            className="!text-xs !font-normal !px-4 !py-2 gap-2"
            href={`/orders/${order.id}/edit`}
          >
            <FaEdit /> Edit
          </BaseButton>
          <BaseButton
            type={buttonType.dark}
            className="!text-xs !font-normal !px-4 !py-2 gap-2"
            clickHandler={() => onDelete(order.id)}
          >
            <FaTrash /> Delete
          </BaseButton>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;