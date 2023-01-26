import React from 'react';

function ShowSuccess(props) {
       return (
              <div className="alert alert-success text-center fw-bold" role="alert" style={{display: props.success ? "" : "none"}}>{props.success}</div>
       );
}

export default ShowSuccess;