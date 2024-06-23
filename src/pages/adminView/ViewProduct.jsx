import React, { useEffect, useState } from "react";
import AdminMenu from "../../components/Layouts/AdminMenu";
import { axiosInstance, getConfig } from "../../utils/urlRequest";
import { RxUpdate } from "react-icons/rx";
import { Button, Flex } from "antd";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const ViewProduct = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      await getConfig();
      try {
        const result = await axiosInstance.get("/api/v1/product/get-product");
        setProducts(result.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    console.log(id);
    try {
      await getConfig();
      const { data } = await axiosInstance.delete(
        `/api/v1/product/delete-product/${id}`
      );

      if (data.success) {
        console.log(data);
        toast.success("Successfully deleted!");
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product._id !== id)
        );
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="min-h-screen bg-gray-50/50">
   <AdminMenu/>
    <div className="p-4 xl:ml-80">
      <nav className="block w-full max-w-full bg-transparent text-white shadow-none rounded-xl transition-all px-0 py-1">
        <div className="flex flex-col-reverse justify-between gap-6 md:flex-row md:items-center"></div>
      </nav>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            {" "}
            All Products
          </h2>

          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {products.map((product) => (
              <div key={product.id} className="group relative">
                <Link to={`/product-details/${product.slug}`} className="group">
                  <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                    <img
                      src={`https://mcov-ecom-backend.onrender.com/uploads/${product.image}`}
                      alt={product.name}
                      className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                    />
                  </div>
                </Link>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <a href="#">
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product.name.substring(0, 40)}...
                      </a>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {product.color}
                    </p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">
                    {" "}
                    ₹{product.price}
                  </p>
                </div>

                <Link to={`/dashboard/admin/product/${product.slug}`}>
                  <Button type="primary">
                    <RxUpdate />
                    Update
                  </Button>
                </Link>

                <Button
                  type="dashed"
                  className="ms-4"
                  danger
                  onClick={() => handleDelete(product._id)}
                >
                  Delete
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default ViewProduct;
