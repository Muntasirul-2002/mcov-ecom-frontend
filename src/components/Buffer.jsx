import React from 'react'
// import { Spin } from 'antd';
import { Button, Result } from 'antd';
import { NavLink } from 'react-router-dom';
const Buffer = () => {
  return (
     <Result
     status="403"
     title="403"
     subTitle="Sorry, you are not authorized to access this page."
     extra={
      <NavLink to='/login'>
        <Button type="primary">Please Login</Button>
      </NavLink>
     }
   />
  )
}

export default Buffer