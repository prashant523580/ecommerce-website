import React from "react";

const Modal = (props) => {
    return(
        <div className="error-modal">
            <div className="modal-header">
                <span>Error</span>
                <span>icon</span>
            </div>
            <div className="modal-body">
                <p>{props,error}</p>
            </div>
        </div>
    )
}