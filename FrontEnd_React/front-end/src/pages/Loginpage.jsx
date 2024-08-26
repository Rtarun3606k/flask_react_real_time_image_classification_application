import React from "react";
import "../css/LoginPage.css";
import { Link } from "react-router-dom";
import { optionsC } from "../utils/utility";
import { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import Loading from "../compnents/Loading";
import { useNavigate } from "react-router-dom";

const Loginpage = () => {
  const navigate = useNavigate();
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a network request or other async operation
    const loadData = async () => {
      setLoading(true);
      // Simulate a delay (e.g., fetch data from an API)
      await new Promise((resolve) => setTimeout(resolve, 2000)); // 2 seconds delay
      setLoading(false);
    };
    loadData();
  }, []);

  const login = async (e) => {
    e.preventDefault();
    console.log("working");

    const body = {
      useremail: username,
      password: password,
    };

    const options = optionsC(false, "POST", body);
    console.log("options", options);

    try {
      const response = await fetch(`http://127.0.0.1:5000/login`, options);
      const data = await response.json();
      console.log("hello:", data.msg);
      toast.success(`${data.msg}`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",

        style: {
          backgroundColor: "rgba(255, 255, 255, 0.09)",
          backdropFilter: "blur(20px)",
          color: "white",
        },
      });
      sessionStorage.setItem("token", data.token);
      navigate("/");
    } catch (error) {
      // const notify = () => toast("Wow so easy!");
      toast.error(`${data.msg}`, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        style: {
          backgroundColor: "rgba(255, 255, 255, 0.09)",
          backdropFilter: "blur(20px)",
          color: "white",
        },
      });
      console.error("Error during login:", error);
    }
  };

  return (
    <>
      {loading ? (
        <div className="body home_body">
          <div className="centering">
            <Loading />
          </div>
        </div>
      ) : (
        <div className="Login-body">
          <div className="box">
            <div className="heading">
              <h2 className="Login-heading">Login </h2>
            </div>
            <div className="inputbox">
              <input
                type="email"
                className="inputClass"
                placeholder="User Email"
                onChange={(e) => {
                  setusername(e.target.value);
                }}
                value={username}
              />
            </div>

            <div className="inputbox">
              <input
                type="password"
                className="inputClass"
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setpassword(e.target.value);
                }}
              />
            </div>
            <div className="Submit">
              <button className=" Submit-btn" onClick={login}>
                Login
              </button>
            </div>
            <hr className="HR" />
            <div className="Text">
              <p>
                Don't have an account?
                <Link to={"/register"} className="Link">
                  Register
                </Link>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Loginpage;
