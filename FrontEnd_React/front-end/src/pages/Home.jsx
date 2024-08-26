import React, { useState, useEffect } from "react";
import "../css/Home.css";
import "../css/LoginPage.css";
import "react-toastify/dist/ReactToastify.css";
import CircleLoading from "../compnents/circleLoading";
import Loading from "../compnents/Loading";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const Home = () => {
  const defaul_timage = "/Red-car-parked-in-front-of-building-Stock-Photo.jpg";
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);
  const [processedImage, setProcessedImage] = useState(null);
  const [processingTime, setProcessingTime] = useState(0);
  const session_token = sessionStorage.getItem("token");
  const [currentImage, setCurrentImage] = useState(defaul_timage);
  const [imageLoading, setImageLoading] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);

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

  const formatProcessingTime = (milliseconds) => {
    const seconds = (milliseconds / 1000).toFixed(2);
    return `${seconds} seconds`;
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setCurrentImage(URL.createObjectURL(event.target.files[0]));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      session_token &&
      session_token != "" &&
      session_token != null &&
      session_token != undefined
    ) {
      // setLoading(true);
      setImageLoading(true);
      setButtonLoading(true);

      const formData = new FormData();
      formData.append("file", selectedFile);

      try {
        const startTime = Date.now();
        const response = await fetch("http://127.0.0.1:5000/upload", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const blob = await response.blob();
        const imageUrl = URL.createObjectURL(blob);
        setProcessedImage(imageUrl);
        const endTime = Date.now(); // Capture end time after receiving response
        const duration = endTime - startTime; // Calculate processing time in milliseconds
        setProcessingTime(duration);
      } catch (error) {
        console.error("Error uploading file:", error);
      } finally {
        // setLoading(false);
        setImageLoading(false);
        setButtonLoading(false);
      }
    } else {
      toast.error("You have Login to access this feature!", {
        style: {
          backgroundColor: "rgba(255, 255, 255, 0.09)",
          backdropFilter: "blur(20px)",
          color: "white",
        },
      });
      toast.error("redirecting you to login page", {
        style: {
          backgroundColor: "rgba(255, 255, 255, 0.09)",
          backdropFilter: "blur(20px)",
          color: "white",
        },
      });
      navigate("/login");
    }
  };

  return (
    <div className="">
      {loading ? (
        <div className="body home_body">
          <div className="centering">
            <Loading />
          </div>
        </div>
      ) : (
        <div className="home_body">
          <div className="width_box">
            <h1>Upload and Process Image</h1>
            <form onSubmit={handleSubmit} className="formInput">
              <input
                type="file"
                onChange={handleFileChange}
                className="input_file"
              />
              {buttonLoading ? (
                <>
                  <CircleLoading />
                </>
              ) : (
                <>
                  {" "}
                  <button type="submit" className="upload_btn">
                    Upload
                  </button>
                </>
              )}
            </form>
            <h2>Processed Image</h2>
            <div className="image_box">
              <div className="box1">
                <Link to={currentImage} target="_blank">
                  <img src={currentImage} alt="Processed" className="imgae" />
                </Link>
                <p>current image</p>
              </div>

              {processedImage && (
                <div className="box2">
                  {imageLoading ? (
                    <div className="">
                      <div className="centering1">
                        <Loading />
                      </div>
                    </div>
                  ) : (
                    <>
                      <Link to={processedImage} target="_blank">
                        {" "}
                        <img
                          src={processedImage}
                          alt="Processed"
                          className="imgae"
                        />
                      </Link>
                      <p>
                        time taken to processe image{" "}
                        {formatProcessingTime(processingTime)}
                      </p>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
