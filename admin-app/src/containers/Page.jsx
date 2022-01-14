import React, { useEffect, useState } from "react";
import Sidenav from "../components/SideNav";
import Carousel, { CarouselItem } from './ui/carousel/carousel';
import Modal from "./ui/modal/Modal";
import "./page.css";
import { useDispatch, useSelector } from "react-redux";
import { CreatePage } from "../actions/page.action";
import linearcategories from "../helpers/linearCategories";
const Pages = () => {
    const [showModal, setShowModal] = useState(false);
    const [title, setTitle] = useState();
    const [productPicture, setProductPicture] = useState([]);
    const [bannerImg, setBannerImg] = useState([]);
    const [categoryId,setCategoryId] = useState();
    const [categories,setCategories] = useState([]);
    const [type,setType] = useState();
    const [pageDesc,setPageDesc] = useState();
    const dispatch = useDispatch();
    const category = useSelector(state => state.category);
    const page = useSelector(state => state.page);
    
    
    useEffect(()=> {
        setCategories(linearcategories(category.categories));
    },[category]);
    useEffect(() => {
        if(!page.loading){
            console.log("loading......");
            setShowModal(false)
        }
        // console.log(page.loading)
    },[page])
    const handleProductImg = (e) => {
    

            setProductPicture([...productPicture, e.target.files[0]]);
        
    }
    const handleBannerImg = (e) => {
       

            setBannerImg([...bannerImg, e.target.files[0]]);
      
    }
    const handleCategoryOnChange = (e) => {
        const category = categories.find(category => category.value == e.target.value);
        setCategoryId(e.target.value);
        setType(category.type);
    }
    const submitCreatePage = (e) => {
        e.preventDefault();
        const form = new FormData();
        form.append("title", title);
        form.append("description",pageDesc);
        form.append("type",type);
        form.append("category",categoryId)
        bannerImg.map((banner,item) => {
            form.append('banners',banner);
        })
        productPicture.map((product) => {
            form.append("products",product)
        })
        // console.log({type,pageDesc,title,bannerImg,productPicture,categoryId})
        dispatch(CreatePage(form));
    }
    const CreatePageModal = () => {
        return(
            <div className="create-page">
            {/* <div className="fade-in"> */}
            {/* <Carousel>
            <CarouselItem>item 1</CarouselItem>
            <CarouselItem>item 2</CarouselItem>
            <CarouselItem>item 3</CarouselItem>
            <CarouselItem>item 4</CarouselItem>
        </Carousel> */}
            {/* </div> */}


            <Modal
                show={showModal}
                header={"create page"}
                close={() => setShowModal(false)}
                className={showModal ? 'fade-in' : "fade-out"}
            >
                <div className="form-group">
                    <label htmlFor="title">title</label>
                    <input type="text" className="form-input" onChange={(e) => setTitle(e.target.value)} defaultValue={title} placeholder="title" />
                </div>
                <div className="form-group">
                    <label htmlFor="description">description</label>
                    <input type="text" className="form-input" onChange={(e) => setPageDesc(e.target.value)} defaultValue={pageDesc} placeholder="description" />
                </div>
                <div className="form-group">
                    <label htmlFor="select">select category</label>
                    <select value={categoryId} id="" className="form-input" onChange={handleCategoryOnChange}>
                        <option>select category</option>
                        {
                            categories.map((option, ind) => {
                                return <option key={ind} value={option.value}>{option.name}</option>
                            })
                        }
                    </select>
                </div>
                <div className="form-group">
                    <div className="label">
                        <label htmlFor="bannerPicture">banner </label>
                        <input type="file" onChange={handleBannerImg} />
                    </div>
                    <div className="picture-container">
                        {
                       bannerImg.length > 0 ?
                                bannerImg.map((picture, ind) => <div key={ind} className='preview-image'>
                                    <img src={URL.createObjectURL(picture)} alt={`${ind}-products`} />
                                </div>) : null
                        }
                    </div>
                </div>
                <div className="form-group">
                    <div className="label">
                        <label htmlFor="productPicture">product picture</label>
                        <input type="file" onChange={handleProductImg} />
                    </div>
                    <div className="picture-container">
                        {
                            productPicture.length > 0 ?
                                productPicture.map((picture, ind) => <div key={ind} className='preview-image'>
                                    <img src={URL.createObjectURL(picture)} alt={`${ind}-products`} />
                                </div>) : null
                        }
                    </div>
                </div>
                <div className="buttons">
                    <div className="form-btn" onClick={() => setShowModal(false)}>cancle</div>
                    <div className="form-btn" onClick={submitCreatePage}>submit</div>
                </div>
            </Modal>

        </div>
        )
    }
    return (
        <>
            <div className="page-container fade-in">
                <Sidenav />
                <div className="main-container">
                    <div className="page-header">
                        <h1> {page.loading ? <> creating page</> : <> create page</>} </h1>
                        <div className="buttons">
                            <button className="btn" onClick={() => setShowModal(true)}>create page</button>
                        </div>
                    </div>
                  {
                  CreatePageModal()
                  }
                </div>

            </div>
        </>
    )
}

export default Pages;