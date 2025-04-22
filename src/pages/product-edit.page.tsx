// src/pages/ProductEdit.tsx
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Product } from "../api/types";
import { axiosConnectionInstance } from "@/api/utils";
import { ENDPOINTS } from "../api/endpoints";
import ProductForm from "@/components/product-form.component";

const ProductEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axiosConnectionInstance.get(
          `${ENDPOINTS.PRODUCTS}${id}/`
        );
        setProduct(response.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleSubmit = async (data: Product) => {
    try {
      await axiosConnectionInstance.put(`${ENDPOINTS.PRODUCTS}${id}/`, data);
      navigate(`/products/${id}`);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Product</h1>
      <ProductForm initialData={product} onSubmit={handleSubmit} />
    </div>
  );
};

export default ProductEdit;