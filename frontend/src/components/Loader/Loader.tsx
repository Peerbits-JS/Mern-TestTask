import React from "react";
import "./loader.css";

const Loader = () => {
    return (<>
        <div className="loader-container">
            <div className="loader-logo">
                <div className="spinner">
                    <div className="rect1"></div>
                    <div className="rect2"></div>
                    <div className="rect3"></div>
                    <div className="rect4"></div>
                    <div className="rect5"></div>
                </div>
            </div>
        </div>
    </>
    );
};

export default Loader;
