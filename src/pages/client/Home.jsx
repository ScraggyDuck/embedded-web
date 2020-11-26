import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Home({ history }) {
  const [roomData, setRoomData] = useState([]);
  const { NameDevice, name, email, address, phone } = JSON.parse(
    localStorage.getItem("client-info")
  );

  const clientToken = localStorage.getItem("client-token");
  useEffect(() => {
    const fetchRoomsData = async () => {
      const {
        data,
      } = await axios.get(
        "https://embedded-server.herokuapp.com/api/v1/rooms/" + NameDevice,
        { headers: { Authorization: `Bearer ${clientToken}` } }
      );
      setRoomData(data.data.data);
    };

    fetchRoomsData();
  }, [NameDevice, clientToken]);

  const onLogout = () => {
    localStorage.removeItem("client-token");
    localStorage.removeItem("client-info");
    history.replace("/login");
  };

  return (
    <div className='container py-5'>
      <div className='main-body'>
        <div className='row gutters-sm'>
          <div className='col-md-4 mb-3'>
            <div className='card'>
              <div className='card-body'>
                <div className='d-flex flex-column align-items-center text-center'>
                  <img
                    src='https://bootdey.com/img/Content/avatar/avatar7.png'
                    alt='Admin'
                    className='rounded-circle'
                    width={150}
                  />
                  <div className='mt-3'>
                    <h4>{name}</h4>
                    <p className='text-secondary mb-1'>Thiết bị {NameDevice}</p>
                    <p className='text-muted font-size-sm'>{address}</p>
                    <button className='btn btn-primary' onClick={onLogout}>
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='col-md-8'>
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
