import React, { useState, useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";

export default function AdminDetail({ history, match }) {
  const [roomData, setRoomData] = useState([]);
  const [user, setUser] = useState({});
  const { NameDevice, name, email, address, phone } = user;

  const adminToken = localStorage.getItem("admin-token");
  useEffect(() => {
    const fetchRoomsData = async () => {
      const { id } = match.params;
      const { data: userData } = await axios.get(
        "https://embedded-server.herokuapp.com/api/v1/users/" + id,
        {
          headers: { Authorization: `Bearer ${adminToken}` },
        }
      );
      setUser(userData.data.data);
      const { data: roomData } = await axios.get(
        "https://embedded-server.herokuapp.com/api/v1/rooms/" +
          userData.data.data.NameDevice,
        {
          headers: { Authorization: `Bearer ${adminToken}` },
        }
      );
      setRoomData(roomData.data.data);
    };

    fetchRoomsData();
  }, [adminToken]);

  return (
    <div className='container py-5'>
      <h4 className='my-3'>
        <NavLink to='/admin'>Quay lại danh sách</NavLink>
      </h4>
      <div className='main-body'>
        <div className='row gutters-sm'>
          <div className='col-md-12'>
            <div className='card mb-3'>
              <div className='card-body'>
                <div className='row'>
                  <div className='col-sm-3'>
                    <h6 className='mb-0'>Full Name</h6>
                  </div>
                  <div className='col-sm-9 text-secondary'>{name}</div>
                </div>
                <hr />
                <div className='row'>
                  <div className='col-sm-3'>
                    <h6 className='mb-0'>Email</h6>
                  </div>
                  <div className='col-sm-9 text-secondary'>{email}</div>
                </div>
                <hr />
                <div className='row'>
                  <div className='col-sm-3'>
                    <h6 className='mb-0'>Phone</h6>
                  </div>
                  <div className='col-sm-9 text-secondary'>{phone}</div>
                </div>
                <hr />
                <div className='row'>
                  <div className='col-sm-3'>
                    <h6 className='mb-0'>Name Device</h6>
                  </div>
                  <div className='col-sm-9 text-secondary'>{NameDevice}</div>
                </div>
                <hr />
                <div className='row'>
                  <div className='col-sm-3'>
                    <h6 className='mb-0'>Address</h6>
                  </div>
                  <div className='col-sm-9 text-secondary'>{address}</div>
                </div>
              </div>
            </div>
            <div className='row gutters-sm'>
              <div className='col-sm-12 mb-3'>
                <div className='card h-100'>
                  <div className='card-body'>
                    <h6 className='d-flex align-items-center mb-3'>
                      <i className='material-icons text-info mr-2'>
                        assignment
                      </i>
                      Thống kê
                    </h6>

                    <table className='table my-3'>
                      <thead className='thead-dark'>
                        <tr>
                          <th scope='col'>Thời gian</th>
                          <th scope='col'>Power</th>
                          <th scope='col'>Energy</th>
                          <th scope='col'>Voltage</th>
                          <th scope='col'>Current</th>
                        </tr>
                      </thead>
                      <tbody>
                        {roomData &&
                          roomData.map((item, index) => {
                            return (
                              <tr key={index}>
                                <th scope='row'>
                                  {new Date(item.createdAt).toLocaleString()}
                                </th>
                                <td>{item.Power}W</td>
                                <td>{item.Energy}kWh</td>
                                <td>{item.Voltage}V</td>
                                <td>{item.Current}A</td>
                              </tr>
                            );
                          })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
