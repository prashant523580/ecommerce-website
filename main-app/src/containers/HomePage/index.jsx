import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllProduct } from '../../actions';
import Carousel, { CarouselItem } from '../../components/ui/carousel/carousel';
import { generateImgUrl } from '../../urlConfig';
// import "./style.scss";

function HomePage(props) {
    const products = useSelector(state => state.product);
    const dispatch = useDispatch();
 
    useEffect(() => {
        dispatch(getAllProduct());
    },[])
    return (
        <>
        <Carousel>
            {
                // category.categories.map((cate,ind) => {
                //     console.log(cate.children)
                // })
                products.products.map((product,ind) => {
                            {console.log(product)}
                        return <CarouselItem><img src={generateImgUrl(product.productPicture[0].img)}/></CarouselItem>
                        
                })
            }
            {/* <CarouselItem>item 12</CarouselItem>
            <CarouselItem>item 13</CarouselItem> */}
        </Carousel>
        </>
    )
}

export default HomePage;
