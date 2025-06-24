import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Slide, toast, ToastContainer } from "react-toastify";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useNavigate,
} from "react-router";
import { usePostCheckTokenMutation } from "./Store/APIs/UserAPIs";
import { changeIsLoggedIn, fetchUser } from "./Store/StoreInterface";

import Loading from "./Components/Loading/Loading";
import Login from "./Pages/Login/Login";
import Logout from "./Pages/Logout/Logout";
import Profile from "./Pages/Profile/Profile";
import Banner from "./Components/Banner/Banner";
import AdminPanel from "./Pages/AdminPanel/AdminPanel";
import Home from "./Pages/Home/Home";
import OptionsManager from "./Pages/OptionsManager/OptionsManager";

import "./App.css";

function App() {
  //--------------- STATES
  const config = useSelector((state) => state.config);
  const [isLoading, setIsLoading] = useState(true);

  //--------------- CONFIGURATIONS
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //--------------- HOOKS
  const [postChecktoken, postChecktokenResponse] = usePostCheckTokenMutation();
  //--------------- USEEFFECTS

  // ********* EXTRACT TOKEN IF ANY
  useEffect(() => {
    const token = localStorage.getItem("token");
    postChecktoken(token);
  }, []);

  useEffect(() => {
    if (
      !postChecktokenResponse.isUninitialized &&
      !postChecktokenResponse.isLoading
    ) {
      if (postChecktokenResponse.isError) {
        setTimeout(() => {
          toast.error(postChecktokenResponse.error.data.message, { delay: 1 });
          setIsLoading(false);
          navigate("/login");
        }, 4000);
      } else {
        setTimeout(() => {
          setIsLoading(false);
          toast.success("Logged In Successfully", { delay: 1 });
          setIsLoading(false);
          dispatch(fetchUser(postChecktokenResponse.data));
          navigate("/home");
          localStorage.setItem("token", postChecktokenResponse.data.token);
          dispatch(changeIsLoggedIn(true));
        }, 4000);
      }
    }
  }, [postChecktokenResponse]);
  //--------------- RENDERED CONTENT
  return (
    <div className="app-parent">
      {isLoading && <Loading />}
      <ToastContainer transition={Slide} theme="dark" />
      <Banner />
      <div className="app-content">
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<Home />} />
          <Route path="/options-manager" element={<OptionsManager />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/manage-users" element={<AdminPanel />} />
        </Routes>
      </div>
    </div>
  );
}
export default App;
