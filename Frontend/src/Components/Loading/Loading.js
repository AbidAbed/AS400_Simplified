import { InfinitySpin } from "react-loader-spinner";
import "./Loading.css";
function Loading() {
  return (
    <div className="loading-container-parent">
      <div className="loading-container">
        <div className="arabbank-logo">
          <div
            style={{
              fontFamily: "Neo Sans",
              fontSize: "20px",
              textAlign: "center",
            }}
          >
            البنك <>&nbsp;&nbsp;&nbsp;&nbsp;</>العربي
          </div>
          <div style={{ fontFamily: "Neo Sans", fontSize: "20px" }}>
            ARAB BANK
          </div>
        </div>
        <InfinitySpin
          color="#07204e"
          height="200"
          width="200"
          visible={true}
          ariaLabel="falling-circles-loading"
        />
        <div className="logo-second-part">
          <InfinitySpin
            color="#07204e"
            height="200"
            width="200"
            visible={true}
            ariaLabel="falling-circles-loading"
          />
        </div>
      </div>
    </div>
  );
}
export default Loading;
