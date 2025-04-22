// src/components/ProductCard.tsx
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { Product } from "@/api/types";
import BaseButton, { buttonType } from "./buttons/base-button.component";

interface ProductCardProps {
  product: Product;
  onDelete: (id: number) => void; // Fixed type to number
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onDelete }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="h-48 bg-gray-200">
        <img
          src={`https://via.placeholder.com/400x300?text=${encodeURIComponent(product.name)}`}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold mb-2 text-sm">{product.name}</h3>
        <div className="mb-2 text-sm">
          <span className="font-normal ">Price:</span> ${product.price.toFixed(2)}
        </div>
        <div className="mb-4 text-sm">
          <span className="font-normal">Quantity:</span> {product.qty}
        </div>
        <div className="flex space-x-2">
          <BaseButton
            type={buttonType.clear}
            className="!text-xs !font-normal !px-4 !py-2 gap-2"
            href={`/products/${product.id}`} // Added Link
          >
            <FaEye /> View
          </BaseButton>
          <BaseButton
            type={buttonType.green}
            className="!text-xs !font-normal !px-4 !py-2 gap-2"
            href={`/products/${product.id}/edit`} // Added Link
          >
            <FaEdit /> Edit
          </BaseButton>
          <BaseButton
            type={buttonType.dark}
            className="!text-xs !font-normal !px-4 !py-2 gap-2"
            clickHandler={() => onDelete(product.id)}
          >
            <FaTrash /> Delete
          </BaseButton>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;