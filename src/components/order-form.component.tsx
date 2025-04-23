import { useForm } from "react-hook-form";
import { OrderFormValues } from "@/api/types";
import BaseButton from "./buttons/base-button.component";
import { buttonType } from "./buttons/base-button.component";
import { useEffect, useState } from "react";
import { axiosConnectionInstance } from "@/api/utils";
import { ENDPOINTS } from "@/api/endpoints";
import { Product } from "@/api/types";

const OrderForm: React.FC<{
  initialData?: Partial<OrderFormValues>;
  onSubmit: (data: OrderFormValues) => void;
}> = ({ initialData, onSubmit }) => {
  const [products, setProducts] = useState<Product[]>([]);
  // Change 'productId' to 'product' in the state
  const [selectedItems, setSelectedItems] = useState<
    { product: number; qty: number }[]
  >([]);

  useEffect(() => {
    if (initialData?.items) {
      setSelectedItems(initialData.items.map(item => ({
        product: item.product,
        qty: item.qty
      })));
    }
  }, [initialData]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axiosConnectionInstance.get(ENDPOINTS.PRODUCTS);
      setProducts(response.data);
    };
    fetchProducts();
  }, []);

  const { register, handleSubmit, setValue } = useForm<OrderFormValues>({
    defaultValues: {
      items: initialData?.items || [],
      paid: initialData?.paid || false,
    },
  });

  const handleItemChange = (index: number, field: 'product' | 'qty', value: any) => {
    const newItems = [...selectedItems];
    newItems[index] = { ...newItems[index], [field]: value };
    setSelectedItems(newItems);
    setValue('items', newItems);
  };

  const addItem = () => {
    setSelectedItems([...selectedItems, { product: 0, qty: 1 }]);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl mx-auto p-4 bg-white rounded-lg shadow-md">
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Items</label>
        {selectedItems.map((item, index) => (
          <div key={index} className="grid grid-cols-2 gap-2 mb-2">
            <select
              value={item.product}
              onChange={(e) => handleItemChange(index, 'product', parseInt(e.target.value))}
              className="px-3 py-2 border rounded-lg"
            >
              <option value="">Select Product</option>
              {products.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} (${p.price})
                </option>
              ))}
            </select>
            <input
              type="number"
              value={item.qty}
              onChange={(e) => handleItemChange(index, 'qty', parseInt(e.target.value))}
              className="px-3 py-2 border rounded-lg"
              min={1}
            />
          </div>
        ))}
        <button
          type="button"
          onClick={addItem}
          className="text-blue-500 hover:underline"
        >
          + Add Item
        </button>
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
