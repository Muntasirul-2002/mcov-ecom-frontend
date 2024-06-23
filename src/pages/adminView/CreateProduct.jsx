import AdminMenu from "../../components/Layouts/AdminMenu";
import React, { useState } from "react";
import { axiosInstance, getConfig } from "../../utils/urlRequest";
import { Button, Flex } from 'antd';
import toast from 'react-hot-toast'
const CreateProduct = () => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    model: "",
    type: "",
    price: "",
    offer: "",
    image: null,
  });

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onFileChange = (e) => {
    setForm((prevState) => ({
      ...prevState,
      image: e.target.files[0],
    }));
  };

  const submitProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const key in form) {
      formData.append(key, form[key]);
    }
    await getConfig();
    const result = await axiosInstance.post(
      "/api/v1/product/products",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    toast.success('Product created')
    console.log(result);
    
  };
  return (
<div className="min-h-screen bg-gray-50/50">
<AdminMenu />
<div className="p-4 xl:ml-80">
  <nav className="block w-full max-w-full bg-transparent text-white shadow-none rounded-xl transition-all px-0 py-1">
    <div className="flex flex-col-reverse justify-between gap-6 md:flex-row md:items-center"></div>
  </nav>
  <div className="">
        <form onSubmit={submitProduct}>
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-4">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">Create Products</h2>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="col-span-full">
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    Name
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="name"
                      onChange={onInputChange}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="col-span-full">
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    Description
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="description"
                      onChange={onInputChange}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="sm:col-span-3">
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    Model
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="model"
                      onChange={onInputChange}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    Type
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="type"
                      onChange={onInputChange}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="sm:col-span-3">
                  <label
                    htmlFor="first-name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Price
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="price"
                      onChange={onInputChange}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="last-name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Offer
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="offer"
                      onChange={onInputChange}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="col-span-full">
                <div className="w-full px-3 py-2 border border-dashed border-gray-900/25 rounded-md">
          <label className="block text-sm font-medium text-gray-700 mb-1">Upload Image</label>
          <input 
            type="file" 
            name="image" 
            onChange={onFileChange} 
            accept="image/*" 
            required 
            className="block w-full text-sm text-gray-900 border border-none rounded-lg cursor-pointer  focus:outline-none"
          />
          <p className="mt-1 text-sm text-gray-500">PNG, JPG, GIF up to 2MB.</p>
        </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-center gap-x-6">
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-10 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
</div>
</div>
  );
};

export default CreateProduct;
