import React from 'react';

function ShowLoading(props) {

       return (
              <div className="custom-loading position-fixed top-50 start-50 translate-middle ms-5 ps-4" style={{display: props.isLoading ? "" : "none", zIndex: "10"}}>
                     <ul className="">
                            <li> </li>
                            <li> </li>
                            <li> </li>
                            <li> </li>
                     </ul>
              </div>
       );
}

export default ShowLoading;