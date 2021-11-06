import React, { useState, useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import axios from "axios";
import { get } from "react-scroll/modules/mixins/scroller";
const UserManagement = () => {
  const [state, setState] = useState("seekers");
  const [data, setData] = useState([]);
  useEffect(() => {
    getData();
  }, [state]);

  useEffect(() => {
    console.log(data);
  }, [...data]);

  const getData = async () => {
    await axios
      .get(`https://match-making-jobhunter-api.herokuapp.com/api/auth/${state}`)
      .then((res) => {
        setData([...res.data]);
        console.log(res.data);
      })
      .catch((err) => console.log(err.response.data));
  };

  const handleBlockUser = async (blockRequest) => {
    await axios
      .put(
        `https://match-making-jobhunter-api.herokuapp.com/api/auth/setStatus/${blockRequest.id}`,
        blockRequest
      )
      .then((res) => getData())
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  return (
    <div style={{ paddingTop: "5em", textAlign: "center" }}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button
          variant="success"
          style={{ marginRight: "5px", width: "95px" }}
          onClick={() => {
            setState("seekers");
          }}
        >
          Seeker
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            setState("employers");
          }}
        >
          Employer
        </Button>
      </div>

      <Table style={{ marginTop: "10px" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>First name</th>
            <th>Last name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {data.map((u) => (
            <tr>
              <td>{u.id}</td>
              <td>{u.firstname}</td>
              <td>{u.lastname}</td>
              <td>{u.phone}</td>
              <td>{u.email}</td>
              <td>{u.roles[0].name}</td>
              <td>{u.status ? "BLOCK" : "ACTIVE"}</td>
              <td>
                <Button
                  onClick={() => {
                    const blockRequest = {
                      id: u.id,
                      firstname: u.firstname,
                      lastname: u.lastname,
                      phone: u.phone,
                      background: u.background,
                      status: !u.status,
                      email: u.email,
                      username: u.username,
                      roles: u.roles,
                      userProfileImageLink: u.userProfileImageLink,
                    };
                    handleBlockUser(blockRequest);
                  }}
                  variant="warning"
                  style={{ width: "100%", marginRight: "10px" }}
                >
                  {u.status ? "Unblock" : "Block"}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default UserManagement;
