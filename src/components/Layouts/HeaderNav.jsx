import { useState } from 'react'
import {
  Dialog,
  DialogPanel,
  PopoverGroup,
  Transition,
  Menu, MenuButton, MenuItem, MenuItems
} from '@headlessui/react'
import {
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { ChevronDownIcon, PhoneIcon, PlayCircleIcon } from '@heroicons/react/20/solid'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import logo from '../../images/logo-removebg.png'
import { useAuth } from '../../context/authentication'
import toast from 'react-hot-toast'
import { BsCart } from "react-icons/bs";
import { useCart } from '../../context/cart'
import { Badge } from 'antd'



  
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }
const HeaderNav = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [auth,setAuth] = useAuth()
    const [cart, setCart] = useCart()
    const navigate = useNavigate()

    const handleLogout = () =>{
      setAuth({
        ...auth,
        user:null,
        token:"",
      })
      localStorage.removeItem('auth')
      localStorage.removeItem('cart')
      localStorage.clear()
      setCart([])
      toast.success('Logout successful')
    }
const handleCartClick = ()=>{
  navigate('/cart')
  window.location.reload()
}


  return (
    <>
      <header className="bg-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img className="h-20 w-20" src={logo} alt="" />
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <PopoverGroup className="hidden lg:flex lg:gap-x-12">

          <Link to='/' className="text-sm font-semibold leading-6 text-gray-900">
            Home
          </Link>
          <Link to="/about" className="text-sm font-semibold leading-6 text-gray-900">
           About
          </Link>
          <Link to="/products" className="text-sm font-semibold leading-6 text-gray-900">
            Products
          </Link>
          <Link to="/contact" className="text-sm font-semibold leading-6 text-gray-900">
            Contact
          </Link>
          <NavLink to='/cart' onClick={handleCartClick}>
          <Badge count={cart?.length}>

          <BsCart className="text-2xl" />
          </Badge>
          </NavLink>
        </PopoverGroup>
        {!auth?.user?(
             <>
             
             </>
        ):(
          <>
          <Menu as="div" className="relative inline-block text-left ms-10">
             <div>
               <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                 <h4>
                 {auth?.user?.name}
                 </h4>
                 <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
               </MenuButton>
             </div>
       
             <Transition
               enter="transition ease-out duration-100"
               enterFrom="transform opacity-0 scale-95"
               enterTo="transform opacity-100 scale-100"
               leave="transition ease-in duration-75"
               leaveFrom="transform opacity-100 scale-100"
               leaveTo="transform opacity-0 scale-95"
             >
               <MenuItems className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                 <div className="py-1">
                   <MenuItem>
                     {({ focus }) => (
                       <NavLink
                         to={`/dashboard/${auth?.user?.role === 1 ? 'admin':'user'}`}
                         className={classNames(
                           focus ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                           'block px-4 py-2 text-sm'
                         )}
                       >
                         Dashboard
                       </NavLink>
                     )}
                   </MenuItem>
                   <MenuItem>
                     {({ focus }) => (
                       <NavLink
                         to='/dashboard/user/profile'
                         className={classNames(
                           focus ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                           'block px-4 py-2 text-sm'
                         )}
                       >
                         Profile
                       </NavLink>
                     )}
                   </MenuItem>
                   <form method="POST" action="#">
                     <MenuItem>
                       {({ focus }) => (
                         <NavLink
                        
                           onClick={handleLogout}
                           
                           className={classNames(
                             focus ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                             'block w-full px-4 py-2 text-left text-sm'
                           )}
                         >
                           Sign out
                         </NavLink>
                       )}
                     </MenuItem>
                   </form>
                 </div>
               </MenuItems>
             </Transition>
           </Menu>
          </>
        )}

        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <Link to="/login" className="text-sm font-semibold leading-6 text-gray-900">
            Log in <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </nav>
      <Dialog className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                className="h-8 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt=""
              />
            </a>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <Link
                  to="/"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Home
                </Link>
                <Link
                  to="/about"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  About
                </Link>
                <Link
                  to="/products"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Products
                </Link>
                <Link
                  to="/contact"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Contacts
                </Link>
              </div>
           
              <div className="py-6">
              <Link
                  to="/login"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Login
                </Link>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
    </>
  );
};

export default HeaderNav;
