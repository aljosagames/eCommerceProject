import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import swal from 'sweetalert';
import { useNavigate } from "react-router-dom";

const ProtectedRoutes = () =>{
  const navigate = useNavigate();
  const [Authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    axios.get('api/checkingAuthenticated').then(res=>{
      if(res.data.status === 200){
        setAuthenticated(true);
      }
      setLoading(false);
    })

    return () =>{
      setAuthenticated(false);
    }

  },[])

  axios.interceptors.response.use(undefined,function axiosRetryInterceptor(err){
    if(err.response.status === 401){
      swal("Unauthorized",err.response.data.message,'warning');
      navigate('/')
    }
    return Promise.reject(err);
  })

  axios.interceptors.response.use(function(res){
    return res;
    }, function(err){
      if(err.response.status === 403){
        swal("Forbidden",err.response.data.message,'warning');
        navigate('/');
      }
      return Promise.reject(err);
    }
  )

  if(loading){
    return <h1>Loading...</h1>
  }

  return (Authenticated ? <Outlet /> : <Navigate to="/" />)
}

export default ProtectedRoutes;