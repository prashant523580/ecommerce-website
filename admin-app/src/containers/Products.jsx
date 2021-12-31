import React, { useState,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, getAllProduct } from '../actions/product.action';
import CloseIcon from '@mui/icons-material/Close';
// import category from '../../../backend/src/models/category';
import { generateImgUrl } from "../urlConfig";
import "./product.css";
import "./category.css";
import Sidenav from '../components/SideNav';
const Products = () => {
    const dispatch = useDispatch();
    const [product, setProduct] = useState({
        name: '',
        price: '',
        description: '',
        quantity: '',
        category: ''
    });
    const [productPicture, setProductImages] = useState([]);
    const [productDetails, setProductDetails] = useState();
    const [toggleProduct, setToggleProduct] = useState("none")
    const [toggleFormProduct, setToggleFormProduct] = useState("none");
    const category = useSelector(state => state.category);
    const AllProducts = useSelector(state => state.product);
    const inputEvents = (e) => {
        const { name, value } = e.target;
        setProduct((pre_val) => {
            return {
                ...pre_val,
                [name]: value
            }
        })
    }

    useEffect(() => {
        dispatch(getAllProduct());
    },[])
    const handleCreateProductForm = (e) => {
        e.preventDefault();
        const form = new FormData();
        form.append("name", product.name);
        // console.log(product.category)
        form.append('price', product.price);
        form.append("description", product.description);
        form.append("quantity", product.quantity);
        form.append("category", product.category);
        for (let picture of productPicture) {
            form.append("productPicture", picture)
        }
        // console.log(product)
        dispatch(addProduct(form));
        setToggleFormProduct('none')
    }
    const createCategoryList = (categories, options = []) => {
        for (let category of categories) {
            options.push({
                value: category._id, name: category.name
            });
            if (category.children.length > 0) {
                createCategoryList(category.children, options)
            }
        }
        return options;
    }
    const handleProductImage = (e) => {
        if(e.target.files.length > 0){
            setProductImages([
                ...productPicture,
                e.target.files[0]
            ]) ;
            
        }
    }
    const showProductsDetails = (product) => {
        setToggleProduct("block");
        setProductDetails(product);
    }
   
    const renderProductDetails = () => {

        if (!productDetails) {
            return null;
        }
        return (
            <>
                <div className="product-content" style={{ display: toggleProduct }}>
                    <span className='close' onClick={() => setToggleProduct("none")}><CloseIcon/></span>
                    <h1>product details</h1>
                    <div className="detail">
                    <h2 htmlFor="name">name</h2>
                    <p>{productDetails.name}</p>
                    </div>
                    <div className="detail">
                    <h2 htmlFor="desc">description</h2>
                    <p> {productDetails.description} </p>
                    </div>
                    <div className="detail">
                        <h2>Category</h2>
                        <p>{productDetails.category.name}</p>
                    </div>
                    <div className="productImg">
                        <div className="header">

                        <h3>Product images</h3>
                        </div>
                        <div className="images">

                        {
                            productDetails.productPicture.map((pic,ind )=>
                                <div className="img" key={ind}>
                                   <img alt={pic.img} src={generateImgUrl(pic.img)} />
                                </div>
                                )
                            }
                            </div>
                    </div>
                </div>
            </>
        )
    }
    return (
        <>
            <div className="page-container">
                <Sidenav />
                <div className="main-form-container fade-in">
                    <div className="main-container">
                        <div className="page-header">
                            <h2>product</h2>
                            <button className="btn" onClick={() => setToggleFormProduct("block")}>add products</button>
                        </div>
                        <div className="modal-form" style={{ display: toggleFormProduct }}>
                            <form action="" onSubmit={handleCreateProductForm}>
                                <div className="form-header">

                                <h4>add Products</h4>
                            <span className='close' onClick={() => setToggleFormProduct("none")}><CloseIcon/></span>
                                </div>
                                <input className="form-input" value={product.name} placeholder={"Product name"} name="name" onChange={inputEvents} type="text" />
                                <input className="form-input" value={product.price} placeholder={"price"} name="price" onChange={inputEvents} type="text" />
                                <input className="form-input" value={product.description} placeholder={"description"} name="description" onChange={inputEvents} type="text" />
                                <input className="form-input" value={product.quantity} placeholder={"Quantity"} name="quantity" onChange={inputEvents} type="number" />
                                <select value={product.category} onChange={inputEvents} name="category" className="form-input">

                                    <option value="">select category</option>
                                    {

                                        createCategoryList(category.categories).map((option) => 
                                            
                                                <option key={option.value} value={option.value}>{option.name}</option>)
                                    }
                                </select>
                                <div className="picture-container">
                                    {
                                        productPicture.length > 0 ?
                                            productPicture.map((picture, ind) => <div key={ind} className='preview-image'>
                                                <img src={URL.createObjectURL(picture)} alt={`${ind}-products`}/>
                                            </div>) : null
                                    }
                                </div>
                                <input type="file" name="productPicture" onChange={handleProductImage} className="form-input" />
                                <div className="buttons">
                                <button className="form-btn" onClick={() => setToggleFormProduct("none")}>cancel</button>    
                                <button className="form-btn" type="submit" >submit</button>
                                </div>
                            </form>
                        </div>
                   
                    <table>
                        <thead>
                            <tr>
                                <th>S.N</th>
                                <th>name</th>
                                <th>Price</th>
                                <th>quantity</th>
                                <th>category</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                AllProducts.products.length > 0 ?
                                    AllProducts.products.map((product, ind) =>

                                        <tr onClick={() => showProductsDetails(product)} key={product._id}>
                                            <td>{ind}</td>
                                            <td>{product.name}</td>
                                            <td>{product.price}</td>
                                            <td>{product.quantity}</td>
                                            <td>{product.category.name}</td>
                                        </tr>
                                    ) : null
                            }

                        </tbody>
                    </table>
                    {renderProductDetails()}

                </div> 
                </div>
            </div>
        </>
    )
}

export default Products;