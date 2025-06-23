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
import Loading from "./Components/Loading/Loading";
import Login from "./Pages/Login/Login";
import { usePostCheckTokenMutation } from "./Store/APIs/UserAPIs";
import Banner from "./Components/Banner/Banner";
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
        });
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
          {/* <Route path="/student" element={<ProtectedStudentRoute />}>
        <Route path="*" element={<LoggedInStudent />} />
      </Route> */}
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </div>
  );
}
export default App;
