import React from "react";
import "../css/Profile.css";
import "../css/LoginPage.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Loading from "../compnents/Loading";

const Profile = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const session_token = sessionStorage.getItem("token");
  const [datau, setdatau] = useState({});
  const fetchdata = async () => {
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${session_token}`,
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(
      `http://127.0.0.1:5000/get_user_data`,
      options
    );
    const data = await response.json();
    if (!response.ok) {
      toast.success(`There was some error`);
      navigate("/");
    } else {
      setdatau(data);
    }
  };
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      // Simulate a delay (e.g., fetch data from an API)
      fetchdata();
      await new Promise((resolve) => setTimeout(resolve, 2000)); // 2 seconds delay
      setLoading(false);
    };
    loadData();
  }, []);

  return (
    <>
      <div className=" box-profile-body">
        {loading ? (
          <div className="body home_body">
            <div className="centering">
              <Loading />
            </div>
          </div>
        ) : (
          <div className=" box profile-box">
            <div className="circle">
              <img
                src="profile.jpg"
                alt="profile"
                className="profile-img-circle"
              />
            </div>
            <div className="data">
              <div className="username">
                <h3>User Name</h3>
                <label htmlFor="">{datau.username}</label>
              </div>
              <div className="useremail">
                <h3>User Email</h3>
                <label htmlFor="">{datau.useremail}</label>
              </div>
            </div>
            <div className="buttons">
              <button className="button-profile delete">Delete Account</button>
              <button className="button-profile upload">Upload image</button>
              <button className="button-profile edit">Edit details</button>
              <button className="button-profile so">Sig out</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Profile;
