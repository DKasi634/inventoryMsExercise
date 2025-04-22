// src/components/OrderForm.tsx
import { useForm } from "react-hook-form";
import { Order } from "@/api/types";
import { Product } from "@/api/types";
import BaseButton from "./buttons/base-button.component";
import { buttonType } from "./buttons/base-button.component";
import { useEffect, useState } from "react";
import { axiosConnectionInstance } from "@/api/utils";
import { ENDPOINTS } from "../api/endpoints";
import { OrderFormValues } from "@/api/types"; // New import

interface OrderFormProps {
  initialData?: Order;
  onSubmit: (data: OrderFormValues) => void; // Changed type
}

const OrderForm: React.FC<OrderFormProps> = ({ initialData, onSubmit }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axiosConnectionInstance.get(ENDPOINTS.PRODUCTS);
      setProducts(response.data);
    };
    fetchProducts();
  }, []);

  const { register, handleSubmit, setValue, watch } = useForm<OrderFormValues>({ // Changed type
    defaultValues: {
      products: initialData?.products.map(p => p.id) || [],
      qty: initialData?.qty || 1,
      paid: initialData?.paid || false,
    },
  });

  const qty = watch('qty');

  useEffect(() => {
    if (initialData) {
      setSelectedProducts(initialData.products.map(p => p.id));
    }
  }, [initialData]);

  const handleProductSelect = (productId: number) => {
    const newSelection = selectedProducts.includes(productId)
      ? selectedProducts.filter(id => id !== productId)
      : [...selectedProducts, productId];
    setSelectedProducts(newSelection);
    setValue('products', newSelection);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl mx-auto p-4 bg-white rounded-lg shadow-md">
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Products</label>
        <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto">
          {products.map(product => (
            <div key={product.id} className="flex items-center">
              <input
                type="checkbox"
                checked={selectedProducts.includes(product.id)}
                onChange={() => handleProductSelect(product.id)}
                className="mr-2"
              />
              <span>{product.name}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Quantity</label>
        <input
          type="number"
          min="1"
          {...register('qty', { required: true, valueAsNumber: true })}
          className="w-full px-3 py-2 border rounded-lg"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Paid</label>
        <input
          type="checkbox"
          {...register('paid')}
          className="mr-2"
        />
      </div>
      <BaseButton type={buttonType.blue} submitType="submit">
        Save Order
      </BaseButton>
    </form>
  );
};

export default OrderForm;