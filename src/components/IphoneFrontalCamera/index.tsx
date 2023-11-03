import React from "react";
import "./styles.scss";

const IphoneFrontalCamera: React.FC = () => {
  return (
    <div className="iphone-frontal-camera">
      <div className="iphone-frontal-camera-eye-container">
        <div className="iphone-frontal-camera-eye">
          <div className="iphone-frontal-camera-eye-pointoflightone" />
          <div className="iphone-frontal-camera-eye-pointoflighttwo" />
        </div>
      </div>
    </div>
  );
};

export default IphoneFrontalCamera;
