import React from "react";
import { Grid } from "react-awesome-spinners";

const Loading = () => {
  return (
    <>
      <div className="box-loading">
        <div className="body">
          <Grid />
          Loading..
        </div>
      </div>
    </>
  );
};

export default Loading;
