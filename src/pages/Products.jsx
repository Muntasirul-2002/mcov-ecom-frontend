import React, { useEffect, useState } from "react";
import Layout from "../components/Layouts/Layout";
import { axiosInstance, getConfig } from "../utils/urlRequest";
import { Link } from "react-router-dom";
import { Empty, Slider, Checkbox, Input, Button } from "antd";
import { useCart } from "../context/cart";
import { useAuth } from "../context/authentication";
import toast from "react-hot-toast";

const { Search } = Input;

const Products = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [selectedModels, setSelectedModels] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useCart();
  const [auth] = useAuth();

  useEffect(() => {
    getAllProducts();
  }, []);

  useEffect(() => {
    if (allProducts.length > 0) {
      applyFilters();
    }
  }, [priceRange, selectedModels, searchQuery]);

  const getAllProducts = async () => {
    try {
      await getConfig();
      const res = await axiosInstance.get("/api/v1/product/get-product");
      setAllProducts(res.data.data);
      setFilteredProducts(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePriceChange = (value) => {
    setPriceRange(value);
  };

  const handleModelChange = (checkedValues) => {
    setSelectedModels(checkedValues);
  };

  const handleSearch = (value) => {
    setSearchQuery(value);
  };

  const applyFilters = () => {
    let products = [...allProducts];

    if (searchQuery.trim() !== "") {
      products = products.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    products = products.filter((product) => {
      const price = parseFloat(product.price.replace(/[^0-9.-]+/g, ""));
      return price >= priceRange[0] && price <= priceRange[1];
    });

    if (selectedModels.length > 0) {
      products = products.filter((product) =>
        selectedModels.includes(product.model)
      );
    }

    setFilteredProducts(products);
  };

  const models = [...new Set(allProducts.map((product) => product.model))].map(
    (model) => ({ label: model, value: model })
  );

  const addProductCart = async (product) => {
    try {
      await getConfig();
      const { data } = await axiosInstance.post("/api/v1/product/cart/add-product", {
        userID: auth?.user?.userID,
        productID: product._id,
        role: auth?.user?.role,
      });

      const existingProductIndex = cart.findIndex(
        (item) => item._id === product._id
      );
      let updatedCart = [...cart];
      if (existingProductIndex > -1) {
        updatedCart[existingProductIndex] = {
          ...updatedCart[existingProductIndex],
          quantity: updatedCart[existingProductIndex].quantity + 1,
        };
      } else {
        updatedCart.push({ ...data.cart[0], quantity: 1 });
      }

      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      toast.success("Your product has been added to cart");
    } catch (error) {
      toast.error('Failed to add product. Please login !')
    }
  };

  return (
    <Layout>
      <div className="relative overflow-hidden bg-white">
        <div className="pb-80 pt-16 sm:pb-40 sm:pt-24 lg:pb-48 lg:pt-40">
          <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
            <div className="sm:max-w-lg">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                Summer styles are finally here
              </h1>
              <p className="mt-4 text-xl text-gray-500">
                This year, our new summer collection will shelter you from the
                harsh elements of a world that doesn't care if you live or die.
              </p>
            </div>
            <div>
              <div className="mt-10">
                <div
                  aria-hidden="true"
                  className="pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl"
                >
                  <div className="absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">
                    <div className="flex items-center space-x-6 lg:space-x-8">
                      <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                        <div className="h-64 w-44 overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100">
                          <img
                            src="https://m.media-amazon.com/images/I/61z9m8wc8wL._SL1000_.jpg"
                            alt=""
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <img
                            src="https://m.media-amazon.com/images/I/41m8oV7u+OL.jpg"
                            alt=""
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                      </div>
                      <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <img
                            src="https://m.media-amazon.com/images/I/61XwKKXrDWL._SL1200_.jpg"
                            alt=""
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <img
                            src="https://m.media-amazon.com/images/I/61oMu13AOEL._SL1500_.jpg"
                            alt=""
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                      </div>
                      <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <img
                            src="https://m.media-amazon.com/images/I/51Q0L8cCGML.jpg"
                            alt=""
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <img
                            src="https://m.media-amazon.com/images/I/51UHO3o8tkL._SL1000_.jpg"
                            alt=""
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <a
                  href="#"
                  className="inline-block transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-sm py-3 px-8 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
                  // className="inline-block rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-center font-medium text-white hover:bg-indigo-700"
                >
                  Shop Collection
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <Search
          placeholder="input search text"
          className="w-72 mb-10 mt-10"
          onSearch={handleSearch}
          enterButton
        />
      </div>
      <div className="bg-white">
        <div className="flex justify-center items-center">
          <h1 className="text-3xl font-bold text-[#4F46E5]">Products</h1>
        </div>
        <div>
          <h1 className="font-bold text-xl text-[#4F46E5]">Filters</h1>
        </div>
        <div className="flex">
          <div className="w-1/4 p-4">
            <div className="mb-4">
              <h4>Filter by Price</h4>
              <Slider
                range
                defaultValue={[0, 1000]}
                onChange={handlePriceChange}
                max={1000}
              />
            </div>
            <div className="mb-4">
              <h4>Filter by Model</h4>
              <Checkbox.Group options={models} onChange={handleModelChange} />
            </div>
          </div>
          <div className="w-3/4 p-4 flex flex-wrap">
            {filteredProducts.length === 0 ? (
              <div className="flex justify-center items-center w-full">
                <Empty />
              </div>
            ) : (
              filteredProducts.map((product) => (
                <div
                  key={product._id}
                  className="bg-white p-4 rounded-lg shadow-md w-72 m-4"
                >
                  <Link to={`/product-details/${product.slug}`}>
                    <img
                      src={`https://mcov-ecom-backend.onrender.com/uploads/${product.image}`}
                      alt={product.name}
                      className="h-48 w-full object-contain mb-4"
                    />
                    <h2 className="text-xl font-bold mb-2">{product.name.substring(0,40)}...</h2>
                    <p className="text-gray-700 mb-2">
                      Price: {product.price}
                    </p>
                  </Link>
                  <button
                    // className="w-full rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    className="w-full px-8 py-3 font-bold uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
                    onClick={() => addProductCart(product)}
                  >
                    Add to Bag
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
