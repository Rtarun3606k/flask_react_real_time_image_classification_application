import React from "react";
import "../css/LoginPage.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { optionsC } from "../utils/utility";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Loading from "../compnents/Loading";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [loadingonclick, setLoadingonclick] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [checker, setChecker] = useState(false);

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

  const check = (username, email, password, password2) => {
    if (!email.includes("@")) {
      console.log("Invalid email");
      // setLoadingonclick(false);
      toast.error("Invalid email");
      setChecker(false);
    } else if (password !== password2) {
      toast.error("Passwords are not matching!!");
      // setLoadingonclick(false);
      console.log("Passwords are not matching!!");
      setChecker(false);
    } else if (
      username.length <= 4 ||
      email.length <= 4 ||
      password.length <= 4 ||
      password2.length <= 4
    ) {
      toast.error("All fields should be more than 4 characters!!");
      console.log("All fields should be more than 4 characters!!");
      // setLoadingonclick(false);
      setChecker(false);
    } else {
      console.log("checking true else");
      // setLoadingonclick(false);
      setChecker(true);
    }
  };

  const register = async (e) => {
    e.preventDefault();
    // setLoadingonclick(true);
    const Body = {
      username: username,
      useremail: email,
      password: password,
    };
    console.log(checker);
    check(username, email, password, password2);

    if (checker === true) {
      const options = optionsC(false, "POST", Body);
      const responce = await fetch(`http://127.0.0.1:5000/register`, options);
      try {
        const data = await responce.json();
        console.log(data.msg);
        toast.success(`${data.msg}`, {
          style: {
            backgroundColor: "rgba(255, 255, 255, 0.09)",
            backdropFilter: "blur(20px)",
            color: "white",
          },
        });
        try {
          const options = optionsC(false, "POST", Body);
          const responce = await fetch(`http://127.0.0.1:5000/login`, options);
          const data = await responce.json();
          console.log(data.msg);
          sessionStorage.setItem("token", data.token);
          navigate("/");
          toast.success(`${data.msg}`, {
            style: {
              backgroundColor: "rgba(255, 255, 255, 0.09)",
              backdropFilter: "blur(20px)",
              color: "white",
            },
          });
        } catch (error) {
          toast.sucess("Continue to the login page ", {
            style: {
              backgroundColor: "rgba(255, 255, 255, 0.09)",
              backdropFilter: "blur(20px)",
              color: "white",
            },
          });
        }

        // toast.success("User created sucessfully")
      } catch (error) {
        console.log(data.msg);
        toast.error(`${data.msg}`, {
          style: {
            backgroundColor: "rgba(255, 255, 255, 0.09)",
            backdropFilter: "blur(20px)",
            color: "white",
          },
        });
      }
    } else if (checker === false) {
      // setLoadingonclick(false);
      return;
    } else {
      toast.error("Try again aftre some time", {
        style: {
          backgroundColor: "rgba(255, 255, 255, 0.09)",
          backdropFilter: "blur(20px)",
          color: "white",
        },
      });
    }
    // setLoadingonclick(false);
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
        <>
          <div className="Login-body ">
            <div className="box margin">
              <div className="heading">
                <h2 className="Login-heading">Register</h2>
              </div>
              <div className="inputbox">
                <input
                  type="text"
                  className="inputClass"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                  placeholder="User Name"
                />
              </div>
              <div className="inputbox">
                <input
                  type="email"
                  className="inputClass"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  placeholder="User email"
                />
              </div>
              <div className="inputbox">
                <input
                  type="password"
                  className="inputClass"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>
              <div className="inputbox">
                <input
                  type="password"
                  className="inputClass"
                  placeholder="Retype Password"
                  value={password2}
                  onChange={(e) => {
                    setPassword2(e.target.value);
                  }}
                />
              </div>
              <div className="Submit">
                {/* {loadingonclick ? (
                  <button className="Submit-btn" disabled>
                    Registering...
                  </button>
                ) : (
                  <button className="Submit-btn" onClick={register}>
                    Register
                  </button>
                )} */}
                <button className="Submit-btn" onClick={register}>
                  Register
                </button>
              </div>
              <hr className="HR" />
              <div className="Text">
                <p>
                  Already have an account?
                  <Link to={"/login"} className="Link">
                    Login
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default RegisterPage;
