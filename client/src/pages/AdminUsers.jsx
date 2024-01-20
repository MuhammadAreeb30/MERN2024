import React, { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const { authorizationToken, isLoading } = useAuth();
  const navigate = useNavigate();

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  const getAllUsersData = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/admin/users", {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });
      const data = await res.json();
      setUsers(data);
      if (!res.ok) {
        toast.error(data.extraDetails ? data.extraDetails : data.message);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // delete the user
  const deleteUserById = async (id) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/admin/users/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: authorizationToken,
          },
        }
      );
      const data = await res.json();
      console.log(data);
      if (res.ok) {
        toast.success(data.message);
        getAllUsersData();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllUsersData();
  }, []);
  return (
    <>
      <section className="admin-users-section">
        <div className="container">
          <h2>Admin Users Data</h2>
        </div>
        <div className="container admin-users">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {users.map((curUsers, index) => {
                return (
                  <tr key={index}>
                    <th>{curUsers.username}</th>
                    <th>{curUsers.email}</th>
                    <th>{curUsers.phone}</th>
                    <th>
                      <Link
                        className="btn"
                        to={`/admin/users/${curUsers._id}/edit`}
                      >
                        Edit
                      </Link>
                    </th>
                    <th>
                      <button onClick={() => deleteUserById(curUsers._id)}>
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

export default AdminUsers;
