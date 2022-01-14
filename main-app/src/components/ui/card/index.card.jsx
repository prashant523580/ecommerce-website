import React from "react";


const Card = (props) => {
    return (
        <div className="card" {...props}>
           {props.header && 
            <div className="card-header">

            </div>
           }
            <div className="card-body">
                {props.children}


            </div>
            
        </div>
    )
}

export default Card;