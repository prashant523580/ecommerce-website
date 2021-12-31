import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useLocation } from "react-router-dom";
import { getProductBySlug } from "../../actions";
import { generateImgUrl } from "../../urlConfig";
import './style.css';
const ProductLists = (props) => {
    let [priceRange,setPriceRange] = useState({
        under5k:5000,
        under10k:10000,
        under20k:20000,
        under30k:30000,
        under60k:60000,
        above60k: "...."
    })
    let dispatch = useDispatch();
    let products = useSelector(state => state.product);
    // let productByPrice = useSelector(state => state.productsByPrice);
    console.log(products)
    const params = useParams();
    useEffect(() => {
        dispatch(getProductBySlug(params.slug))
        // console.log(Object.keys(products.productsByPrice))
    }, [])
    return (
        <>
            <div className="container">
                {
                    Object.keys(products.productsByPrice).map((key, ind) => {
                        return (
                            <div className="card">
                                <div className="card-header">
                                    <h1> {priceRange[key]} </h1>
                                    <button>view all</button>
                                </div>
                                <div className="card-body">
                                    {
                                          products.productsByPrice[key].map((product, ind) => {
                                              console.log(product)
                                            return (
                                                <div key={ind} className="product">

                                                    <div className="product-img">
                                                        <img src={generateImgUrl(product.productPicture[0].img)} alt="" />
                                                    </div>

                                                    <div className="product-details">
                                                        <p> {product.name}</p>
                                                        <p><span>rating</span> <span></span></p>
                                                        <p>{product.price}</p>
                                                    </div>
                                                </div>
                                            )
                                        })

                                    }
                                </div>
                            </div>

                        )
                    })
                }
            </div>
        </>
    )
}

export default ProductLists;