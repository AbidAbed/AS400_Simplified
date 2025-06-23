import { useLocation } from "react-router";
import "./Banner.css";
import { useSelector } from "react-redux";
function Banner() {
  //--------------- STATES
  const { isLoggedIn } = useSelector((state) => state.config);
  //--------------- CONFIGURATIONS
  //--------------- HOOKS
  const location = useLocation();
  console.log(isLoggedIn);
  //--------------- USEEFFECTS
  //--------------- RENDERED CONTENT
  return isLoggedIn ? <div className="banner-parent"></div> : <></>;
}

export default Banner;
