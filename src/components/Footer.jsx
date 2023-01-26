import React from 'react';

function Footer(props) {
       return (
              <div>
                     <footer className={props.small ? "py-5 dark-bg align-item-center position-fixed bottom-0 w-100": "py-5 dark-bg align-item-center"} >
                            <div className="container px-4"><p className="m-0 text-center text-white" style={{ fontWeight: "500"}}>Copyright &copy; BlogApi 2022 | By <a href="https://github.com/HeT-Delwadiya" className="fw-bold" target="_blank" style={{textDecoration:"none", color: "#892cdc"}} rel="noreferrer">Het Delwadiya</a></p></div>
                     </footer>
              </div>
       );
}

export default Footer;