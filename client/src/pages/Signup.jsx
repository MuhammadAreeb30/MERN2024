import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";

const Signup = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
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
      const res = await fetch(`http://localhost:5000/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      if (res.ok) {
        const res_data = await res.json();
        console.log(res_data);
        storeTokenInLS(res_data.token);
        alert("Registration Successful");
        setUser({
          username: "",
          email: "",
          phone: "",
          password: "",
        });
        navigate("/login");
      } else {
        // Error handling for non-ok responses
        const errorData = await res.json();
        console.error("Registration Error:", errorData);
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
                  src="./images/register.png"
                  alt="register image"
                  width="500px"
                  height="500px"
                />
              </div>
              {/* registration from */}
              <div className="registration-form">
                <h1 className="main-heading mb-3">registration form</h1>
                <br />
                <form onSubmit={handleSubmit} method="POST">
                  <div>
                    <label htmlFor="username">username</label>
                    <input
                      type="text"
                      name="username"
                      placeholder="Username"
                      id="username"
                      value={user.username}
                      required
                      autoComplete="off"
                      onChange={handleInputs}
                    />
                  </div>
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
                    <label htmlFor="phone">phone</label>
                    <input
                      type="number"
                      name="phone"
                      placeholder="Enter Your Phone"
                      id="phone"
                      value={user.phone}
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

export default Signup;
