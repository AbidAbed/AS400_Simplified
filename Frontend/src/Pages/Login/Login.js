import "./Login.css";

function Login() {


  
  return (
    <div className="login-parent">
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
        />
      </div>

      <button className="login-button">Login</button>
    </div>
  );
}

export default Login;
