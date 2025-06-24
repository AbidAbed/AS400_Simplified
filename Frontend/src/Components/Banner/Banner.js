import { useLocation, useNavigate } from "react-router";
import "./Banner.css";
import { useSelector } from "react-redux";
import useConfigureBanner from "../../Hooks/useConfigureBanner";
import { useEffect, useState } from "react";
function Banner() {
  //--------------- STATES
  const [bannerOptions, setBannerOptions] = useState([]);

  //--------------- CONFIGURATIONS
  //--------------- HOOKS
  const getBannerOptions = useConfigureBanner();
  const user = useSelector((state) => state.user);
  const { isLoggedIn } = useSelector((state) => state.config);
  const locationPath = useLocation();
  const navigate = useNavigate();

  //--------------- USEEFFECTS
  useEffect(() => {
    if (isLoggedIn) {
      setBannerOptions(
        getBannerOptions(user.authrizations, isLoggedIn, locationPath.pathname)
      );
    }
  }, [isLoggedIn, locationPath.pathname]);
  //--------------- EVENT TRIGERS
  function handlePathClicked(e, path) {
    e.preventDefault();
    navigate(path);
  }
  //--------------- RENDERED CONTENT
  return isLoggedIn ? (
    <div className="banner-parent">
      {bannerOptions.map((bannerOption) => (
        <div
          className="option-parent"
          style={{
            backgroundColor:
              locationPath.pathname === bannerOption.path ? "#382ece" : "",
          }}
          onClick={(e) => handlePathClicked(e, bannerOption.path)}
        >
          <div className="option-icon">{bannerOption.icon}</div>
          <div className="option-label">{bannerOption.label}</div>
        </div>
      ))}
    </div>
  ) : (
    <></>
  );
}

export default Banner;
