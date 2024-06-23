import React, { useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { LuLayoutDashboard } from "react-icons/lu";
import { FaRegUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { RiTruckLine } from "react-icons/ri";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { AiFillProduct } from "react-icons/ai";
import { LuHome } from "react-icons/lu";
import { RiLogoutBoxLine } from "react-icons/ri";
import { FiUserPlus } from "react-icons/fi";
import { GrDocumentUser } from "react-icons/gr";
import { HiOutlineUserGroup } from "react-icons/hi";
const AdminMenu = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const toggleSidebar = () =>{
    setIsSidebarOpen(!isSidebarOpen)
  }
  return (
   <>
    <button
        className="fixed top-4 left-4 z-50 p-2 text-white bg-gray-800 rounded-lg xl:hidden"
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2.5"
            stroke="currentColor"
            aria-hidden="true"
            className="h-5 w-5 text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2.5"
            stroke="currentColor"
            aria-hidden="true"
            className="h-5 w-5 text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        )}
      </button>
      <aside
        className={`fixed inset-0 z-40 flex transform  ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-80"
        } transition-transform duration-300 xl:translate-x-0 bg-gradient-to-br from-gray-800 to-gray-900 h-[calc(100vh-32px)] w-72 my-4 ml-4 rounded-xl`}
      >
        <div className="m-4 mt-16">
          <ul className="mb-4 flex flex-col gap-1">
            <li>
              <Link aria-current="page" className="active" to="/dashboard/admin">
                <button
                  className="middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85] w-full flex items-center gap-4 px-4 capitalize"
                  type="button"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                    className="w-5 h-5 text-inherit"
                  >
                    <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
                    <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
                  </svg>
                  <p className="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">
                    dashboard
                  </p>
                </button>
              </Link>
            </li>
            <li>
              <Link className to="/dashboard/admin/profile">
                <button
                  className="middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg text-white hover:bg-white/10 active:bg-white/30 w-full flex items-center gap-4 px-4 capitalize"
                  type="button"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                    className="w-5 h-5 text-inherit"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <p className="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">
                    profile
                  </p>
                </button>
              </Link>
            </li>
            <li>
              <Link className to="/dashboard/admin/orders">
                <button
                  className="middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg text-white hover:bg-white/10 active:bg-white/30 w-full flex items-center gap-4 px-4 capitalize"
                  type="button"
                >
                  <RiTruckLine className="text-xl" />
                  <p className="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">
                    Orders Details
                  </p>
                </button>
              </Link>
            </li>
            <li>
              <Link className to="/dashboard/admin/user-details">
                <button
                  className="middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg text-white hover:bg-white/10 active:bg-white/30 w-full flex items-center gap-4 px-4 capitalize"
                  type="button"
                >
                  <GrDocumentUser className="text-xl" />
                  <p className="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">
                  User Details
                  </p>
                </button>
              </Link>
            </li>
            <li>
              <Link className to="/dashboard/admin/admin-details">
                <button
                  className="middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg text-white hover:bg-white/10 active:bg-white/30 w-full flex items-center gap-4 px-4 capitalize"
                  type="button"
                >
                  <GrDocumentUser className="text-xl" />
                  <p className="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">
                  Admin Details
                  </p>
                </button>
              </Link>
            </li>
            <li>
              <Link className to="/dashboard/admin/product-view">
                <button
                  className="middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg text-white hover:bg-white/10 active:bg-white/30 w-full flex items-center gap-4 px-4 capitalize"
                  type="button"
                >
                  <AiFillProduct className="text-xl" />
                  <p className="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">
                  View Products
                  </p>
                </button>
              </Link>
            </li>
          </ul>
          <ul className="mb-4 flex flex-col gap-1">
            <li className="mx-3.5 mt-4 mb-2">
              <p className="block antialiased font-sans text-sm leading-normal text-white font-black uppercase opacity-75">
                Create Section
              </p>
            </li>
            <li>
              <Link className to="/dashboard/admin/product">
                <button
                  className="middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg text-white hover:bg-white/10 active:bg-white/30 w-full flex items-center gap-4 px-4 capitalize"
                  type="button"
                >
                  <AiFillProduct className="text-xl" />
                  <p className="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">
                  Create Product
                  </p>
                </button>
              </Link>
            </li>
            <li>
              <Link className to="/dashboard/admin/new-admin">
                <button
                  className="middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg text-white hover:bg-white/10 active:bg-white/30 w-full flex items-center gap-4 px-4 capitalize"
                  type="button"
                >
                  <FiUserPlus className="text-xl" />
                  <p className="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">
                  Create Admin
                  </p>
                </button>
              </Link>
            </li>
          </ul>
          <ul className="mb-4 flex flex-col gap-1">
            <li className="mx-3.5 mt-4 mb-2">
              <p className="block antialiased font-sans text-sm leading-normal text-white font-black uppercase opacity-75">
                auth pages
              </p>
            </li>
            <li>
              <Link className to="/">
                <button
                  className="middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg text-white hover:bg-white/10 active:bg-white/30 w-full flex items-center gap-4 px-4 capitalize"
                  type="button"
                  // onClick={handleLogout}
                >
                  <RiLogoutBoxLine className="text-xl" />
                  <p className="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">
                    Logout
                  </p>
                </button>
              </Link>
            </li>
            <li>
              <Link className to="/">
                <button
                  className="middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg text-white hover:bg-white/10 active:bg-white/30 w-full flex items-center gap-4 px-4 capitalize"
                  type="button"
                  // onClick={handleLogout}
                >
                  <RiLogoutBoxLine className="text-xl" />
                  <p className="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">
                    Home
                  </p>
                </button>
              </Link>
            </li>
          </ul>
        </div>
      </aside>
   
   </>
 



  )
}

export default AdminMenu