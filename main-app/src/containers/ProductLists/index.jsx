import React from "react";

import './style.css';
import ProductStore from "./ProductStore";
import   getParam from "../../utils/getParam";
import ProductPage from "./ProductPage";
// import { useParams } from "react-router-dom";
const ProductLists = (props) => {
    const params = getParam()
    const renderProduct = () => {
        const params  = getParam(props.location.search);
        let content = null;
        switch(params.type){
            case "store":
                content = <ProductStore {...props} />
                break;
            case "page" :
                content = <ProductPage {...props}/>
        }
        return content;
    }
    return (
        <>
                {renderProduct()}
        </>
    )
}

export default ProductLists;