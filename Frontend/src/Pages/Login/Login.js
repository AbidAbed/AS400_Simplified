import { useDispatch, useSelector } from "react-redux";
import "./Login.css";
import {
  changeIsLoggedIn,
  fetchUser,
  usePostLoginMutation,
} from "../../Store/StoreInterface";
import { useEffect, useState } from "react";
import Loading from "../../Components/Loading/Loading";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

function Login() {
  //--------------- STATES
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  //--------------- CONFIGURATIONS
  const { isLoggedIn } = useSelector((state) => state.config);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //--------------- HOOKS
  const [postLogin, postLoginResponse] = usePostLoginMutation();

  //--------------- USEEFFECTS
  useEffect(() => {
    if (!postLoginResponse.isUninitialized && !postLoginResponse.isLoading) {
      if (postLoginResponse.isError) {
        setTimeout(() => {
          toast.error(postLoginResponse.error.data.message, { delay: 1 });
          setIsLoading(false);
        }, 4000);
      } else {
        setTimeout(() => {
          toast.success("Logged In Successfully", { delay: 1 });
          setIsLoading(false);
          dispatch(fetchUser(postLoginResponse.data));
          navigate("/home");
          localStorage.setItem("token", postLoginResponse.data.token);
          dispatch(changeIsLoggedIn(true));
        }, 4000);
      }
    }
  }, [postLoginResponse]);

  //--------------- EVENT HANDLERS
  function handleLogin(e) {
    e.preventDefault();
    setIsLoading(true);
    postLogin({ username, password });
  }

  //--------------- RENDERED CONTENT
  return (
    <div className="login-parent">
      {isLoading && <Loading />}
      <div className="login-title">Login</div>

      <div className="input-group">
        <label className="input-label" htmlFor="username">
          Username
        </label>
        <input
          className="input-field"
          type="text"
          id="username"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      <div className="input-group">
        <label className="input-label" htmlFor="password">
          Password
        </label>
        <input
          className="input-field"
          type="password"
          id="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button className="login-button" onClick={handleLogin}>
        Login
      </button>
    </div>
  );
}

export default Login;
