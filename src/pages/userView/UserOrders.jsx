import React from 'react'
import UserMenu from '../../components/Layouts/UserMenu'

const UserOrders = () => {
  return (
    <section className='flex gap-6'>
        <UserMenu/>
        <div className="m-3 text-3xl text-gray-500 font-semibold">
          Orders:
        </div>

    </section>
  )
}

export default UserOrders