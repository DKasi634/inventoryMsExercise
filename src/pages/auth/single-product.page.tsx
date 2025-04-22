// src/pages/ProductDetail.tsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Product } from "@/api/types";
import { axiosConnectionInstance } from "@/api/utils";
import { ENDPOINTS } from "@/api/endpoints";

const ProductDetail = () => {
  const { id } = useParams();
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

  if (loading) return <div>Loading...</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <div className="p-4">
      <div className="max-w-3xl mx-auto">
        <img
          src={`https://via.placeholder.com/800x400?text=${encodeURIComponent(product.name)}`}
          alt={product.name}
          className="w-full h-64 object-cover rounded-lg mb-4"
        />
        <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
        <div className="mb-4">
          <span className="font-semibold">Price:</span> ${product.price.toFixed(2)}
        </div>
        <div className="mb-4">
          <span className="font-semibold">Quantity:</span> {product.qty}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;