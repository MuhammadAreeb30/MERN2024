import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { storeTokenInLS } = useAuth();

  const handleInputs = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setUser({ ...user, [name]: value });
  };

  // handling the form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:5000/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const res_data = await res.json();
      // console.log("login", res_data);
      if (res.ok) {
        storeTokenInLS(res_data.token);
        toast.success("Login Successful");
        setUser({
          email: "",
          password: "",
        });
        navigate("/");
      } else {
        // Error handling for non-ok responses
        toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message);
        console.error("Login Error:", errorData);
      }
    } catch (error) {
      console.log("register:", error);
    }
  };

  return (
    <>
      <section>
        <main>
          <div className="section-registration">
            <div className="container grid grid-two-cols">
              <div className="registration-image">
                <img
                  src="./images/login.png"
                  alt="login image"
                  width="500px"
                  height="500px"
                />
              </div>
              {/* registration from */}
              <div className="registration-form">
                <h1 className="main-heading mb-3">Login form</h1>
                <br />
                <form onSubmit={handleSubmit} method="POST">
                  <div>
                    <label htmlFor="email">email</label>
                    <input
                      type="text"
                      name="email"
                      placeholder="Enter Your Email"
                      id="email"
                      value={user.email}
                      required
                      autoComplete="off"
                      onChange={handleInputs}
                    />
                  </div>
                  <div>
                    <label htmlFor="password">password</label>
                    <input
                      type="password"
                      name="password"
                      placeholder="Enter Your Password"
                      id="password"
                      value={user.password}
                      required
                      autoComplete="off"
                      onChange={handleInputs}
                    />
                  </div>
                  <button type="submit">register now</button>
                </form>
              </div>
            </div>
          </div>
        </main>
      </section>
    </>
  );
};

export default Login;
