import { useEffect, useState } from "react";
import { StarIcon } from "@heroicons/react/20/solid";
import { axiosInstance, getConfig } from "../utils/urlRequest";
import { Link, useParams } from "react-router-dom";
import Layout from "../components/Layouts/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/authentication";
import toast from "react-hot-toast";
import { Spin } from "antd";
const reviews = { href: "#", average: 4, totalCount: 117 };

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const ProductDetails = () => {
  const [productDetails, setProductDetails] = useState({});
  const [relatedProduct, setRelatedProduct] = useState([]);
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [cart, setCart] = useCart();
  const [auth] = useAuth();
  const params = useParams();

  useEffect(() => {
    if (params?.slug) getProductDetails();
  }, [params?.slug]);
  // fetch the product details data
  const getProductDetails = async () => {
    try {
      await getConfig();
      const { data } = await axiosInstance.get(
        `/api/v1/product/get-product/${params.slug}`
      );
      setProductDetails(data?.product);

      console.log("Total Product Get:", data?.product);
      getSimilarProducts(data?.product.model, data?.product.type);
    } catch (error) {
      console.log(error);
    }
  };

  // add to cart
  const addToCart = async (product) => {
    try {
      await getConfig();
      const { data } = await axiosInstance.post(
        "/api/v1/product/cart/add-product",
        {
          userID: auth?.user?.userID,
          productID: product._id,
          role: auth?.user?.role,
        }
      );

      const updatedCart = [...cart, data.cart[0]];
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      toast.success("product added to cart !");
    } catch (error) {
      toast.error("Failed to add product to cart. Please login!");
    }
  };

  // get related product
  const getSimilarProducts = async (model, type) => {
    try {
      await getConfig();
      const { data } = await axiosInstance.get(
        "/api/v1/product/get-related-products",
        {
          params: { model, type }, // Send parameters as query parameters
        }
      );
      setRelatedProduct(data.products); // Update state with 'data.products'
      setLoading(false); // Set loading to false after fetching data
      console.log("related products:", data.products); // Log 'data.products' to check received data
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="bg-white">
        <div className="pt-6">
          {/* Image gallery */}
          <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8"></div>

          {/* Product info */}
          <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
            <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
              <img
                src={`https://mcov-ecom-backend.onrender.com/${productDetails.image}`}
                alt={productDetails.name}
                className="h-full w-full object-cover object-center"
              />
            </div>

            {/* Options */}
            <div className="mt-4 lg:row-span-3 lg:mt-0">
              <h2 className="sr-only">Product information</h2>
              <p className="text-3xl tracking-tight text-gray-900 font-semibold">
                {productDetails.name}
              </p>
              <p className="text-sm mt-4 tracking-tight text-gray-600">
                {productDetails.description}
              </p>
              <p className="text-sm mt-4 tracking-tight text-gray-700 font-bold">
                <span>Phone :</span> {productDetails.model}
              </p>
              <p className="text-sm mt-4 tracking-tight text-gray-700 font-bold">
                <span>Model :</span> {productDetails.type}
              </p>
              <p className="text-3xl mt-4 tracking-tight text-gray-900">
                ₹{productDetails.price}{" "}
                <span className="ml-2  tracking-tight inline-block bg-green-700 opacity-45 text-white text-sm font-bold px-3 py-1 rounded">
                  {productDetails.offer}%
                </span>
              </p>

              {/* Reviews */}
              <div className="mt-6">
                <h3 className="sr-only">Reviews</h3>
                <div className="flex items-center">
                  <div className="flex items-center">
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <StarIcon
                        key={rating}
                        className={classNames(
                          reviews.average > rating
                            ? "text-gray-900"
                            : "text-gray-200",
                          "h-5 w-5 flex-shrink-0"
                        )}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <p className="sr-only">{reviews.average} out of 5 stars</p>
                  <a
                    href={reviews.href}
                    className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    {reviews.totalCount} reviews
                  </a>
                </div>
              </div>

              <div className="mt-10">
                <button
                  type="submit"
                  onClick={() => addToCart(productDetails)}
                  className="mt-10 flex w-full font-bold items-center justify-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
                  // className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Add to bag
                </button>
              </div>
            </div>
          </div>
          <div>
            <div className="mb-10 flex justify-center items-center">
              <h2 className="text-2xl font-semibold text-gray-900">
                Related products you may like
              </h2>
            </div>
            {loading ? (
          <div className="flex justify-center items-center mt-10">
            <Spin size="large" />
          </div> 
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-16">
            {relatedProduct.map((relatedProduct) => (
              <div key={relatedProduct._id} className="relative flex flex-col mt-6 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-96 ms-4">
<Link to={`/product-details/${relatedProduct.slug}`}>


                <div className="relative h-56 mx-4 -mt-6 overflow-hidden text-white shadow-lg bg-clip-border rounded-xl bg-blue-gray-500 shadow-blue-gray-500/40">
                  <img
                    src={`https://mcov-ecom-backend.onrender.com/uploads/${relatedProduct.image}`}
                    alt={relatedProduct.name} 
                  />
                </div>
                <div className="p-6">
                  <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                    {relatedProduct.name}
                  </h5>
                  <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
                    {relatedProduct.description.substring(0,40)}...
                  </p>
                </div>
                </Link>
                <div className="p-6 pt-0">
                  <button
                    onClick={() => addToCart(relatedProduct)}
                    className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
                    type="button"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
