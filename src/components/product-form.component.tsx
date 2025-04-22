// src/components/ProductForm.tsx
import { useForm } from "react-hook-form";
import { Product } from "../api/types";
import BaseButton from "./buttons/base-button.component";
import { buttonType } from "./buttons/base-button.component";

interface ProductFormProps {
  initialData?: Product;
  onSubmit: (data: Product) => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ initialData, onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Product>({
    defaultValues: initialData || {
      name: "",
      price: 0,
      qty: 0,
    },
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md"
    >
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Name</label>
        <input
          {...register("name", { required: "Name is required" })}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.name && (
          <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Price</label>
        <input
          type="number"
          step="0.01"
          {...register("price", { required: "Price is required", min: 0 })}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.price && (
          <p className="text-red-500 text-xs mt-1">{errors.price.message}</p>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Quantity</label>
        <input
          type="number"
          {...register("qty", { required: "Quantity is required", min: 0 })}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.qty && (
          <p className="text-red-500 text-xs mt-1">{errors.qty.message}</p>
        )}
      </div>
      <BaseButton type={buttonType.blue} submitType="submit">
        Save Product
      </BaseButton>
    </form>
  );
};

export default ProductForm;