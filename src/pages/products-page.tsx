// src/pages/ProductsPage.tsx
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { Product } from "@/api/types";
import ProductCard from "@/components/product-card.component";
import { axiosConnectionInstance } from "@/api/utils";
import { ENDPOINTS } from "../api/endpoints";
import BaseButton, { buttonType } from "@/components/buttons/base-button.component";
import Spinner from "@/components/spinner.component";

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosConnectionInstance.get(ENDPOINTS.PRODUCTS);
        setProducts(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load products");
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (productUId: string) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axiosConnectionInstance.delete(`${ENDPOINTS.PRODUCTS}${productUId}/`);
        setProducts(products.filter((p) => p.uid !== productUId));
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
        <BaseButton type={buttonType.blue} rounded={false} href="/products/create" >
          <FaPlus className="mr-2" /> Create New Product
        </BaseButton>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};


export default ProductsPage;