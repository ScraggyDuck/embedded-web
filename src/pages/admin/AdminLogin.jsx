import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { Redirect } from "react-router-dom";
import { NavLink } from "react-router-dom";

import "../../scss/style.scss";

export default function AdminLogin({ history }) {
  const adminToken = localStorage.getItem("admin-token");

  const { register, handleSubmit } = useForm();
  const onLogin = async (data) => {
    try {
      const { data: dataServer } = await axios.post(
        "https://embedded-server.herokuapp.com/api/v1/users/admin/login",
        data
      );
      console.log(dataServer);

      localStorage.setItem("admin-token", dataServer.token);
      localStorage.setItem("admin-info", JSON.stringify(dataServer.data.user));
      history.replace("/admin");
    } catch (error) {
      alert("Đăng nhập thất bại!!!");
    }
  };
  if (adminToken) {
    return <Redirect to='/admin' />;
  }

  return (
    <div className='auth-wrapper'>
      <div className='container'>
        <div className='auth-bg'>
          <span className='r' />
          <span className='r s' />
          <span className='r s' />
          <span className='r' />
        </div>
        {/* Card */}
        <div className='card o-hidden border-0 shadow-lg my-5'>
          <div className='card-body p-0'>
            {/* Nested Row within Card Body */}
            <div className='row'>
              <div
                className='col-lg-5 d-none d-lg-block bg-login-image'
                style={{ height: "80vh" }}
              />
              <div className='col-lg-7 d-flex justify-content-center  align-items-center'>
                <div className='p-5 w-100'>
                  <div className='text-center'>
                    <h1 className='h4 text-gray-900 mb-4'>Welcome Back!</h1>
                  </div>
                  <form className='user'>
                    {/* Input */}
                    <div className='form-group'>
                      <input
                        type='email'
                        className='form-control form-control-user'
                        placeholder='Email Address'
                        ref={register}
                        name='email'
                      />
                    </div>
                    {/* End input */}
                    {/* Input */}
                    <div className='form-group'>
                      <input
                        type='password'
                        className='form-control form-control-user'
                        placeholder='Password'
                        ref={register}
                        name='password'
                      />
                    </div>
                    {/* End input */}

                    <button
                      onClick={handleSubmit(onLogin)}
                      className='btn btn-primary btn-user btn-block my-4'>
                      Login
                    </button>
                  </form>
                  {/* end form */}
                  <div className='text-center'>
                    <a className='small' href='#'>
                      Forgot Password?
                    </a>
                  </div>
                  <div className='text-center'>
                    <NavLink className='small' to='/admin/register'>
                      Create an Account!
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* End card */}
      </div>
    </div>
  );
}
