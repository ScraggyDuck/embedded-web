import React, { useState, useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";

export default function Home({ history }) {
  const adminToken = localStorage.getItem("admin-token");
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchRoomsData = async () => {
      const { data } = await axios.get(
        "https://embedded-server.herokuapp.com/api/v1/users",
        {
          headers: { Authorization: `Bearer ${adminToken}` },
        }
      );
      setUsers(data.data.data);
    };

    fetchRoomsData();
  }, [adminToken]);

  const onLogout = () => {
    localStorage.removeItem("admin-token");
    localStorage.removeItem("admin-info");
    history.replace("/admin/login");
  };

  return (
    <div className='container'>
      <h1 className='text-center my-4'>Welcome</h1>
      <div className='d-flex  align-items-center'>
        <h6 onClick={onLogout} className='btn btn-primary mr-3' role='button'>
          Logout
        </h6>
        <h6 className='btn btn-light mr-3'>
          <NavLink to='/admin/register'>Thêm tài khoản hộ gia đình</NavLink>
        </h6>
      </div>

      <h3 className='my-5'>Danh sách các hộ gia đình</h3>
      <div className='row'>
        {users &&
          users.length > 0 &&
          users.map((user, index) => {
            return (
              user.role != "admin" && (
                <div key={index} className='col-xl-3 col-md-6 mb-4'>
                  <NavLink to={`/admin/detail/${user._id}`}>
                    <div className='card border-left-warning shadow h-100 py-2'>
                      <div className='card-body'>
                        <div className='row no-gutters align-items-center'>
                          <div className='col mr-2'>
                            <div className='text-xs font-weight-bold text-warning text-uppercase mb-1'>
                              Hộ gia đình : {user.name}
                            </div>
                            <div className='h5 mb-0 font-weight-bold text-gray-800'>
                              Thiết bị: {user.NameDevice}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </NavLink>
                </div>
              )
            );
          })}
      </div>
    </div>
  );
}
