// src/pages/ProductEdit.tsx
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Product } from "../api/types";
import { axiosConnectionInstance } from "@/api/utils";
import { ENDPOINTS } from "../api/endpoints";
import ProductForm from "@/components/product-form.component";
import Spinner from "@/components/spinner.component";

const ProductEdit = () => {
  const { uid } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axiosConnectionInstance.get(
          `${ENDPOINTS.PRODUCTS}${uid}/`
        );
        setProduct(response.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [uid]);

  const handleSubmit = async (data: Product) => {
    try {
      await axiosConnectionInstance.put(`${ENDPOINTS.PRODUCTS}${uid}/`, data);
      navigate(`/products/${uid}`);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div><Spinner/></div>;
  if (!product) return <div>Product not found</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Product</h1>
      <ProductForm initialData={product} onSubmit={handleSubmit} />
    </div>
  );
};

export default ProductEdit;