// src/pages/ProductCreate.tsx
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Product } from "../api/types";
import { axiosConnectionInstance } from "@/api/utils";
import { ENDPOINTS } from "../api/endpoints";
import ProductForm from "@/components/product-form.component";
import { getRandomUuid } from "@/utils";
import Spinner from "@/components/spinner.component";

const ProductCreate = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);


    const handleSubmit = async (data: Product) => {
        setLoading(true)
        try {
            await axiosConnectionInstance.post(`${ENDPOINTS.PRODUCTS}`, {...data, uid:getRandomUuid()});
            navigate(`/products/${data.uid}`);
        } catch (err) {
            console.error(err);
        }
        setLoading(false)
    };

    if (loading) return <div><Spinner/></div>;

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Create Product</h1>
            <ProductForm initialData={null} onSubmit={handleSubmit} />
        </div>
    );
};

export default ProductCreate;