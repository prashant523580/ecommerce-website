import React from 'react';
import Sidenav from '../components/SideNav';
import Carousel, { CarouselItem } from './carousel';
import "./home.css"

const Home = () => {

    return(
        <>
        <div className="page-container fade-in">
            <Sidenav/>
            {/* <div className="fade-in"> */}
                <Carousel>
                   <CarouselItem>item 1</CarouselItem>
                   <CarouselItem>item 2</CarouselItem>
                   <CarouselItem>item 3</CarouselItem>
                   {/* <CarouselItem>item 4</CarouselItem> */}
                </Carousel>
            {/* </div> */}

        </div>
        </>
    )
}

export default Home;