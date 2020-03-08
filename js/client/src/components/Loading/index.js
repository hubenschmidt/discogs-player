import React from "react";

export default () => (
  <div className="loading-wrapper fadein-slow">
    <h4>Discogs is spinning up, one moment plz..</h4>
    <div className="loading">
      <div className="background">
        <i className="icon-discogs"></i>
      </div>
      <div className="spinner" />
    </div>
  </div>
);
