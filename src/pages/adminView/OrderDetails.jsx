import React from 'react'
import AdminMenu from '../../components/Layouts/AdminMenu'

const OrderDetails = () => {
  return (
    <>
      <div className="min-h-screen bg-gray-50/50">
        <AdminMenu />
        <div className="p-4 xl:ml-80">
          <nav className="block w-full max-w-full bg-transparent text-white shadow-none rounded-xl transition-all px-0 py-1">
            <div className="flex flex-col-reverse justify-between gap-6 md:flex-row md:items-center"></div>
          </nav>
          <div>
            <h3>
                Users Order Details
            </h3>
          </div>
        </div>
      </div>
    </>
  )
}

export default OrderDetails