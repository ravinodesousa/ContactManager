import React from "react";

export default () => {
  return (
    <div>
      <h1 className="display-4">
        <i className="fas fa-exclamation-circle" style={{ color: "red" }} />{" "}
        <span className="text-danger">404</span> Page Not Found
      </h1>
      <p className="lead">Sorry, that page does not exist</p>
    </div>
  );
};
