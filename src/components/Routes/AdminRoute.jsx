import { useState,useEffect } from "react";
import axios from "axios";
import { Outlet } from "react-router-dom";
import { useAuth } from "../../context/authentication";
import toast from "react-hot-toast";

export default function PrivateRoute(){
    const [ok,setOk] = useState(false)
    const [auth] = useAuth()

    useEffect(()=>{
        const authCheck = async ()=>{
            try {
                
                const res = await axios.get('/api/v1/auth/admin-auth')
                if(res.data.ok){
                    setOk(true)
                }else{
                    setOk(false)
                }
            } catch (error) {
                console.log(error)
                toast.error("oops! you don't have access")
            }
        }
        if(auth?.token)authCheck()
    },[auth?.token])
return ok ? <Outlet/> : "try after some time"
}