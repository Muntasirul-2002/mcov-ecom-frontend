import React, { useState } from "react";
import { axiosInstance, getConfig } from "../utils/urlRequest";

const ImageUpload = () => {
  
  const [form, setForm] = useState({
    name: '',
    description: '',
    model: '',
    type: '',
    price: '',
    offer: '',
    image: null
  });

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setForm(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const onFileChange = (e) => {
    setForm(prevState => ({
      ...prevState,
      image: e.target.files[0]
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
    console.log(result);
  };
  return (
   <>
   
   <form onSubmit={submitProduct}>
        <input type="text" name="name" placeholder="Name" onChange={onInputChange} required />
        <input type="text" name="description" placeholder="Description" onChange={onInputChange} required />
        <input type="text" name="model" placeholder="Model" onChange={onInputChange} required />
        <input type="text" name="type" placeholder="Type" onChange={onInputChange} required />
        <input type="text" name="price" placeholder="Price" onChange={onInputChange} required />
        <input type="text" name="offer" placeholder="Offer" onChange={onInputChange} required />
        <input type="file" name="image" onChange={onFileChange} accept="image/*" required />
        <button type="submit" className="rounded bg-blue-gray-400 p-2">
          Submit
        </button>
      </form>
   </>
  );
};

export default ImageUpload;
