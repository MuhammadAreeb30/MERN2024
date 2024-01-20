import React, { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

const AdminContacts = () => {
  const [contactData, setContactData] = useState([]);

  const { authorizationToken } = useAuth();

  const getAllUserContactData = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/admin/contacts", {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });
      const data = await res.json();
      if (res.ok) {
        setContactData(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // user contact delete
  const deleteUserById = async (id) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/admin/contacts/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: authorizationToken,
          },
        }
      );
      const data = await res.json();
      if (res.ok) {
        toast.success(data.message);
        getAllUserContactData();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllUserContactData();
  }, []);

  return (
    <>
      <section className="admin-users-section">
        <div className="container">
          <h1 className="main-heading">Admin Users Contact Data</h1>
        </div>
        <div className="container admin-users">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Message</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {contactData.map((curData, index) => {
                return (
                  <tr key={index}>
                    <th>{curData.username}</th>
                    <th>{curData.email}</th>
                    <th>{curData.message}</th>
                    <th>
                      <button onClick={() => deleteUserById(curData._id)}>
                        Delete
                      </button>
                    </th>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};

export default AdminContacts;
