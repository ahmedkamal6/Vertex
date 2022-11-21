import React from "react";
import GoogleLogin from "react-google-login";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import logo from "../assets/logo.png";
import { gapi } from "gapi-script";
import background from "../assets/Login-bg.mp4";
import Client from "../Client";

const Login = () => {
    const navigate = useNavigate()
  const responseGoogle = (response) => {
    console.log(response);
    localStorage.setItem("user", JSON.stringify(response.profileObj));
    const { name, googleId, imageUrl } = response.profileObj;
    const doc = {
      _id: googleId,
      _type: "user",
      userName: name,
      image: imageUrl,
    };
    Client.createIfNotExists(doc).then(()=>{
      navigate('/',{replace:true})
    })
  };
  /* email
  : 
  "a.divel199@gmail.com"
  familyName
  : 
  "ahmed"
  givenName
  : 
  "ahmed"
  googleId
  : 
  "115176613944164611402"
  imageUrl
  : 
  "https://lh3.googleusercontent.com/a/ALm5wu33jFx8ob22s3RRCHjCEbm1vmjsdSFncx7Lwl7R=s96-c"
  name
  : 
  "ahmed ahmed" */


  React.useEffect(() => {
    const initClient = () => {
      gapi.auth2.init({
        clientId: import.meta.env.VITE_GOOGLE_API_TOKEN,
        scope: "",
      });
    };
    gapi.load("client:auth2", initClient);
  });

  return (
    <div className="flex justify-start items-center flex-col h-screen">
      <div className="relative w-full h-full">
        <video
          src={background}
          typeof="video/mp4"
          loop
          controls={false}
          muted
          autoPlay
          className="w-full h-full object-cover"
        />
        <div className="absolute flex flex-col justify-center items-center top-0 right-0 bottom-0 left-0 bg-blackOverlay">
          <div className="p-5">
            <img src={logo} alt="logo" width="130px" />
          </div>
          <div className="shaddow-2x1">
            <GoogleLogin
              clientId={import.meta.env.VITE_GOOGLE_API_TOKEN}
              render={(renderProps) => (
                <button
                  type="button"
                  className="bg-mainColor flex justify-center items-center p-3 rounded-lg cursor-pointer oulitne-none"
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                >
                  <FcGoogle className="mr-4" /> Sign in with Google
                </button>
              )}
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy="single_host_origin"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
Login;
