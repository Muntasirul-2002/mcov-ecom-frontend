import React, { useEffect, useState } from "react";

import { Button, Flex } from "antd";
import { axiosInstance, getConfig } from "../../utils/urlRequest";
import { NavLink } from "react-router-dom";
import toast from "react-hot-toast";
import AdminMenu from "../../components/Layouts/AdminMenu";

const ViewAdmins = () => {
  const [getAdmin, setGetAdmin] = useState([]);

  useEffect(() => {
    const getAllAdmin = async () => {
      try {
        await getConfig();
        const res = await axiosInstance.get("/api/v1/auth/admins");

        setGetAdmin(res.data);
        console.log(res.data); // Verify the data structure
      } catch (error) {
        console.log(error);
      }
    };
    getAllAdmin();
  }, []);
  //function to format date and date and time
  const formatDateTime = (dateTimeString) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };

    return new Date(dateTimeString).toLocaleString(undefined, options);
  };

  // admin delete functionality
  const handleDelete = async (id) => {
    try {
      await getConfig();
      const { data } = await axiosInstance.delete(
        `/api/v1/auth/delete-admin/${id}`
      );
      if (data.success) {
        toast.success("admin deleted successfully");
        setGetAdmin((prevAdmin) =>
          prevAdmin.filter((admin) => admin._id !== id)
        );
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="min-h-screen bg-gray-50/50">
        <AdminMenu />
        <div className="p-4 xl:ml-80">
          <nav className="block w-full max-w-full bg-transparent text-white shadow-none rounded-xl transition-all px-0 py-1">
            <div className="flex flex-col-reverse justify-between gap-6 md:flex-row md:items-center"></div>
          </nav>
          <div className="md:w-3/4">
            <div className="w-full mx-auto bg-white shadow-md rounded-lg overflow-hidden">
              <h2 className="mt-6 text-2xl font-semibold text-center text-blue-600">
                Admin Information
              </h2>
              <div className="overflow-x-auto mt-4">
                <table className="w-full text-sm text-left text-gray-500 m-2">
                  <thead className="text-xs text-gray-700 uppercase bg-blue-100">
                    <tr>
                      <th className="px-6 py-3">#</th>
                      <th className="px-6 py-3">Name</th>
                      <th className="px-6 py-3">Email</th>
                      <th className="px-6 py-3">Phone</th>
                      <th className="px-6 py-3">Address</th>
                      <th className="px-6 py-3">Register Date</th>
                      <th className="px-6 py-3">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getAdmin.map((admin, index) => (
                      <tr
                        key={index}
                        className="bg-white border-b hover:bg-gray-50"
                      >
                        <td className="px-6 py-4">{index + 1}</td>
                        <td className="px-6 py-4 font-medium text-gray-900">
                          {admin.name}
                        </td>
                        <td className="px-6 py-4">{admin.email}</td>
                        <td className="px-6 py-4">{admin.phone}</td>
                        <td className="px-6 py-4">{admin.address}</td>
                        <td className="px-6 py-4">
                          {formatDateTime(admin.createdAt)}
                        </td>
                        <td className="px-6 py-4 flex gap-2">
                          <Button
                            type="dashed"
                            danger
                            onClick={() => handleDelete(admin._id)}
                          >
                            Delete / Block
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewAdmins;
