import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import "../../scss/style.scss";

export default function AdminRegister({ history }) {
  const { register, handleSubmit } = useForm();

  const onRegister = async (data) => {
    console.log(data);
    try {
      const { data: dataServer } = await axios.post(
        "https://embedded-server.herokuapp.com/api/v1/users/admin/signup",
        data
      );
      history.replace("/admin");
    } catch (error) {
      alert("Đăng ký thất bại!!!");
    }
  };

  return (
    <div className='auth-wrapper'>
      <div className=' container'>
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
              <div className='col-lg-5 d-none d-lg-block bg-register-image' />
              <div className='col-lg-7'>
                <div className='p-5'>
                  <div className='text-center'>
                    <h1 className='h4 text-gray-900 mb-4'>
                      Create an Account!
                    </h1>
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
                    {/* Input */}
                    <div className='form-group'>
                      <input
                        type='text'
                        className='form-control form-control-user'
                        placeholder='Name'
                        ref={register}
                        name='name'
                      />
                    </div>
                    {/* End input */}
                    {/* Input */}
                    <div className='form-group'>
                      <input
                        type='text'
                        className='form-control form-control-user'
                        placeholder='Address'
                        ref={register}
                        name='address'
                      />
                    </div>
                    {/* End input */}
                    {/* Input */}
                    <div className='form-group'>
                      <input
                        type='text'
                        className='form-control form-control-user'
                        placeholder='Phone'
                        ref={register}
                        name='phone'
                      />
                    </div>
                    {/* End input */}
                    {/* Input */}
                    <div className='form-group'>
                      <input
                        type='text'
                        className='form-control form-control-user'
                        placeholder='Name Device'
                        ref={register}
                        name='NameDevice'
                      />
                    </div>
                    {/* End input */}

                    <button
                      onClick={handleSubmit(onRegister)}
                      className='btn btn-primary btn-user btn-block my-4'>
                      Register Account
                    </button>
                  </form>
                  {/* end form */}
                  <div className='text-center'>
                    <a className='small' href='#'>
                      Forgot Password?
                    </a>
                  </div>
                  <div className='text-center'>
                    <NavLink className='small' to='/admin/login'>
                      Already have an account? Login!
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
