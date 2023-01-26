import React from 'react';

function ShowError(props) {
       return (
              <div className="alert alert-danger text-center fw-bold" role="alert" style={{display: props.error ? "" : "none"}}>{props.error}</div>
       );
}

export default ShowError;