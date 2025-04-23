// src/components/Dashboard.tsx
import { useEffect, useState } from "react";
import {
    FaShoppingCart,
    FaDollarSign,
    FaChartLine,
    FaArrowUp
} from "react-icons/fa";
import { axiosConnectionInstance } from "@/api/utils";
import Spinner from "@/components/spinner.component";

interface DashboardData {
    total_orders: number;
    total_revenue: number;
    popular_products: { name: string; total_sold: number }[];
}

const Dashboard = () => {
    const [data, setData] = useState<DashboardData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosConnectionInstance.get("/dashboard/");
                setData(response.data);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading)
        return (
            <div className="flex justify-center items-center h-screen">
                <Spinner />
            </div>
        );

    return (
        <div className=" bg-gray-100 min-h-screen w-full mx-auto py-6">

            <div className="w-full md:w-[90%] lg:w-[86%] mx-auto">
                <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard</h1>
                {/* Metrics Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 ">
                    {/* Total Orders */}
                    <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
                        <FaShoppingCart className="text-blue-500 text-4xl mb-4" />
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">Total Orders</h3>
                        <div className="text-3xl font-bold text-gray-900">
                            {data?.total_orders || 0}
                        </div>
                    </div>

                    {/* Total Revenue */}
                    <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
                        <FaDollarSign className="text-green-500 text-4xl mb-4" />
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">Total Revenue</h3>
                        <div className="text-3xl font-bold text-gray-900">
                            ${data?.total_revenue.toFixed(2) || "0.00"}
                        </div>
                    </div>

                    {/* Popular Products */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <div className="flex items-center space-x-2 mb-4">
                            <FaChartLine className="text-purple-500 text-2xl" />
                            <h3 className="text-lg font-semibold text-gray-700">Popular Products</h3>
                        </div>
                        <ul className="space-y-2">
                            {data?.popular_products.length ? (
                                data.popular_products.map((product, index) => (
                                    <li key={index} className="flex justify-between items-center">
                                        <span className="text-gray-700">{product.name}</span>
                                        <span className="text-sm bg-green-100 text-green-700 px-2 py-1 rounded-full">
                                            {product.total_sold} sold
                                        </span>
                                    </li>
                                ))
                            ) : (
                                <div className="text-gray-500 text-center">No data available</div>
                            )}
                        </ul>
                    </div>
                </div>

                {/* Additional Insights Section */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                        Performance Trends
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Trend 1: Order Growth */}
                        <div className="flex items-center space-x-4">
                            <div className="bg-blue-100 text-blue-600 p-3 rounded-full">
                                <FaArrowUp className="text-xl" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Order Growth</p>
                                <p className="font-semibold text-gray-800">
                                    +{Math.floor(Math.random() * 20)}% this month
                                </p>
                            </div>
                        </div>

                        {/* Trend 2: Revenue Growth */}
                        <div className="flex items-center space-x-4">
                            <div className="bg-green-100 text-green-600 p-3 rounded-full">
                                <FaArrowUp className="text-xl" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Revenue Growth</p>
                                <p className="font-semibold text-gray-800">
                                    +{Math.floor(Math.random() * 25)}% this month
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;