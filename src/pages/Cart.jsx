import React, { useEffect, useState } from "react";
import { useCart } from "../context/cart";
import { useAuth } from "../context/authentication";
import Layout from "../components/Layouts/Layout";
import { axiosInstance, getConfig } from "../utils/urlRequest";
import { IoCloseSharp } from "react-icons/io5";
import { NavLink, useNavigate } from "react-router-dom";
import { Button, Empty, Typography } from "antd";
import toast from "react-hot-toast";
import axios from "axios";
import GooglePayButton from "@google-pay/button-react";
const Cart = () => {
  const [cart, setCart] = useCart();
  const [auth] = useAuth();
  const [quantities, setQuantities] = useState({});
  const navigate = useNavigate();
  const SHIPPING_CHARGE = 40;

  useEffect(() => {
    const initialQuantities = {};
    cart.forEach((product) => {
      initialQuantities[product._id] = 1;
    });
    setQuantities(initialQuantities);
  }, [cart]);

  //function for handle increasing quantities
  const increaseQuantity = (productId) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: prevQuantities[productId] + 1,
    }));
  };

  //function for handle decreasing quantities
  const decreaseQuantity = (productId) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: Math.max(1, prevQuantities[productId] - 1),
    }));
  };
  const subtotalPrice = () => {
    if (cart.length === 0) return 0;
    let subtotal = 0;
    cart.forEach((product) => {
      subtotal += product.price * (quantities[product._id] || 1);
    });
    return subtotal.toFixed(2);
  };

  const totalPrice = () => {
    if (cart.length === 0) return 0;
    let subtotal = parseFloat(subtotalPrice());
    let total = subtotal + SHIPPING_CHARGE;
    return total.toFixed(2);
  };
  useEffect(() => {
    const savedQuantities = JSON.parse(localStorage.getItem("cartQuantities"));
    if (savedQuantities) {
      console.log("Saved quantities:", savedQuantities); // Log the saved quantities
      setQuantities(savedQuantities);
    } else {
      // If no quantities are saved in localStorage, initialize with default values
      const initialQuantities = {};
      cart.forEach((product) => {
        initialQuantities[product._id] = 1; // Initial quantity for each item is 1
      });
      setQuantities(initialQuantities);
      localStorage.setItem("cartQuantities", JSON.stringify(initialQuantities));
    }
  }, []);
  // Update localStorage whenever quantities change
  useEffect(() => {
    localStorage.setItem("cartQuantities", JSON.stringify(quantities));
  }, [quantities]);

  //remove product from cart
  // Function to remove product from cart or decrease quantity
  const removeCartProduct = async (pid) => {
    if (quantities[pid] > 1) {
      setQuantities((prevQuantities) => ({
        ...prevQuantities,
        [pid]: prevQuantities[pid] - 1,
      }));
    } else {
      try {
        console.log(cart);
        await getConfig();
        const { data } = await axiosInstance.post(
          "/api/v1/product/cart/remove-product",
          {
            userID: auth?.user.userID,
            productID: pid,
          }
        );
        console.log(data.cart);
        setCart(data.cart);
        localStorage.setItem("cart", JSON.stringify(data.cart));
      } catch (error) {
        console.log(error);
      }
    }
  };
  // testing payment functions
  const handlePaymentSuccess = () => {
    const orderDetails = {
      user: auth?.user,
      cart,
      quantities,
      subtotal: subtotalPrice(),
      shipping: SHIPPING_CHARGE,
      total: totalPrice(),
      date: new Date().toISOString(),
    };

    localStorage.setItem("orderDetails", JSON.stringify(orderDetails));
    toast.success("Payment successful! Order has been placed.");
    setCart([]);
    localStorage.removeItem("cart");
  };
  return (
    <Layout>
      <div>
        <div className="h-screen bg-white pt-20">
          <h1 className="mb-2 text-center text-2xl font-bold">Cart Items</h1>
          <h3 className="mb-10 text-center text-xl text-gray-500">
            {!auth?.user
              ? "Hello 👋🏻 Guest"
              : `Hello 👋🏻 ${auth?.token && auth?.user?.name}`}
          </h3>
          {cart.length === 0 ? (
            <>
              <Empty
                image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                className="flex flex-col justify-center items-center"
                imageStyle={{
                  height: 60,
                }}
                description={
                  <Typography.Text>
                    <span className="text-xl font-semibold">
                      🫣 Your cart is empty.
                    </span>
                  </Typography.Text>
                }
              >
                <NavLink to="/products">
                  <Button type="primary">Shop Now</Button>
                </NavLink>
              </Empty>
            </>
          ) : (
            <>
              <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
                <div className="rounded-lg md:w-2/3">
                  {cart?.map((p) => (
                    <div
                      className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start"
                      key={p._id}
                    >
                      <img
                        src={`https://mcov-ecom-backend.onrender.com/uploads/${p.image}`}
                        alt={p.name}
                        className="w-full rounded-lg sm:w-40"
                      />
                      <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                        <div className="mt-5 sm:mt-0">
                          <h2 className="text-lg font-bold text-gray-900">
                            {p.name}
                          </h2>
                          <p className="mt-1 text-xs text-gray-700">
                            {p.model}
                          </p>
                        </div>
                        <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                          <div className="flex items-center border-gray-100">
                            <button
                              onClick={() => decreaseQuantity(p._id)}
                              className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"
                            >
                              {" "}
                              -{" "}
                            </button>
                            <span className="h-5 w-8  text-center text-sm outline-none">
                              {quantities[p._id]}
                            </span>

                            <button
                              onClick={() => increaseQuantity(p._id)}
                              className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"
                            >
                              {" "}
                              +{" "}
                            </button>
                          </div>
                          <div className="flex items-center space-x-4">
                            <p className="text-sm">₹{p.price}</p>
                            <button onClick={() => removeCartProduct(p._id)}>
                              <IoCloseSharp />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {/* Sub total */}
                <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
                  <div className="mb-2 flex justify-between">
                    <p className="text-gray-700">Subtotal</p>
                    <p className="text-gray-700">₹{subtotalPrice()}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-gray-700">Shipping</p>
                    <p className="text-gray-700">
                      ₹{cart.length === 0 ? 0 : SHIPPING_CHARGE}
                    </p>
                  </div>
                  <hr className="my-4" />
                  <div className="flex justify-between">
                    <p className="text-lg font-bold">Total</p>
                    <div className>
                      <p className="mb-1 text-lg font-bold">₹{totalPrice()}</p>
                      <p className="text-sm text-gray-700">
                        {cart.length === 0 ? "" : "including SC"}
                      </p>
                    </div>
                  </div>

                  <GooglePayButton
                    environment="TEST"
                    className="lg:ml-5 lg:mt-3"
                    paymentRequest={{
                      apiVersion: 2,
                      apiVersionMinor: 0,
                      allowedPaymentMethods: [
                        {
                          type: "CARD",
                          parameters: {
                            allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
                            allowedCardNetworks: ["MASTERCARD", "VISA"],
                          },
                          tokenizationSpecification: {
                            type: "PAYMENT_GATEWAY",
                            parameters: {
                              gateway: "example",
                              gatewayMerchantId: "exampleGatewayMerchantId",
                            },
                          },
                        },
                      ],
                      merchantInfo: {
                        merchantId: "12345678901234567890",
                        merchantName: "Demo Merchant",
                      },
                      transactionInfo: {
                        totalPriceStatus: "FINAL",
                        totalPriceLabel: "Total",
                        totalPrice: totalPrice(),
                        currencyCode: "INR",
                        countryCode: "IN",
                      },
                      shippingAddressRequired: true,
                      callbackIntents: [
                        "SHIPPING_ADDRESS",
                        "PAYMENT_AUTHORIZATION",
                      ],
                    }}
                    onLoadPaymentData={(paymentRequest) => {
                      console.log("load payment data", paymentRequest);
                    }}
                    onPaymentAuthorized={(paymentData) => {
                      console.log("Payment Authorized Success", paymentData);
                      handlePaymentSuccess();
                      return { transactionState: "SUCCESS" };
                    }}
                    onPaymentDataChanged={(paymentData) => {
                      console.log("Payment Data Changed", paymentData);
                      return {};
                    }}
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
