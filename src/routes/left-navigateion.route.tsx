// src/components/LeftNavigation.tsx
import React, { useState } from "react";
import {
  FaHome,
  FaBoxOpen,
  FaShoppingCart,
  FaPlusCircle,
  FaChartLine,
} from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { HiMenuAlt3, HiX } from "react-icons/hi"; // For hamburger menu

const LeftNavigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { path: "/", label: "Home", icon: <FaHome /> },
    { path: "/dashboard", label: "Dashboard", icon: <FaChartLine /> },
    { path: "/products", label: "Products", icon: <FaBoxOpen /> },
    { path: "/products/create", label: "Create Product", icon: <FaPlusCircle /> },
    { path: "/orders", label: "Orders", icon: <FaShoppingCart /> },
    { path: "/orders/new", label: "Create Order", icon: <FaPlusCircle /> },
  ];

  return (
    <>
      {/* Hamburger Menu Button (Visible on Mobile) */}
      <button
        className="fixed top-4 left-4 z-50 bg-blue-500 text-white p-2 rounded-lg md:hidden"
        onClick={toggleMenu}
      >
        {isOpen ? <HiX size={24} /> : <HiMenuAlt3 size={24} />}
      </button>

      {/* Sidebar */}
      <div
        className={`${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } fixed inset-y-0 left-0 w-64 bg-white shadow-md transition-transform duration-300 ease-in-out z-40 md:relative md:translate-x-0`}
      >
        <div className="p-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800">Admin Panel</h2>
            <button
              className="md:hidden text-gray-600 hover:text-gray-800"
              onClick={toggleMenu}
            >
              <HiX size={24} />
            </button>
          </div>

          {/* Navigation Links */}
          <ul className="space-y-2">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={`flex items-center space-x-3 px-4 py-2 rounded-lg ${
                    location.pathname === link.path
                      ? "bg-blue-100 text-blue-600"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {React.cloneElement(link.icon, {
                    className: "text-lg",
                  })}
                  <span className="text-sm font-medium">{link.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Overlay for Mobile Menu */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden"
          onClick={toggleMenu}
        ></div>
      )}
    </>
  );
};

export default LeftNavigation;