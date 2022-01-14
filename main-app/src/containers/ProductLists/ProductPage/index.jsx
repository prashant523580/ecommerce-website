import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductPage } from "../../../actions";
import Card from "../../../components/ui/card/index.card";
import Carousel, { CarouselItem } from "../../../components/ui/carousel/carousel";
import getParam from "../../../utils/getParam";


const ProductPage = (props) => {
    const dispatch = useDispatch();
    const product = useSelector(state => state.product);
    const { page } = product;

    useEffect(() => {
        const param = getParam(props.location.search);
        const payload = {
            param
        }

        dispatch(getProductPage(payload));
    }, [])
 
    return (
        <>
            <Carousel>
                {
                    page.banners && page.banners.map((banner, ind) =>
                        <CarouselItem key={ind}>
                            <a href={banner.navigateTo} >
                                <img src={banner.img} alt="" />
                            </a>
                        </CarouselItem>
                    )
                }
            </Carousel>

            <Card >
                {
                    page.products && page.products.map((product, ind) =>
                        <div className="product" key={ind}>
                            <div className="product-img" >

                                <img src={product.img} />
                            </div>
                            <p>shop now</p>
                        </div>
                    )
                }
            </Card>
        </>
    )
}

export default ProductPage;