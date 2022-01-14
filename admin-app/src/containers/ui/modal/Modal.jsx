import React, { Children } from "react";
import CloseIcon from "@mui/icons-material/Close";
import "./style.css";
const Modal = (props) => {
    const {children,header,show,close,className} = props;
    // if(show){
        
    // }
    return(
        show &&
        <>
        
            <div className={`${!show  ? `modal-form ` + className : "modal-form"}`} >
                <form action="">

                <div className="form-header">
                    <h4>{header}</h4>
                    <div className="close" onClick={close}><CloseIcon/></div>
                </div>
                {children}
                </form>
            </div>
        </>
    )
}

export default Modal;