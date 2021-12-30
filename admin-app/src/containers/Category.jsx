import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCategory, getAllCategory } from '../actions/category.action';
import CloseIcon from '@mui/icons-material/Close';
import Sidenav from '../components/SideNav';
import "./category.css"
const Category = () => {
    const [name, setCategoryItem] = useState('');
    const [categoryImage, setCategoryImage] = useState('');
    const [parentId, setParentCategoryId] = useState('');
    const dispatch = useDispatch();
    const [toggleCategoryForm, setToggleCategoryForm] = useState('none');

    const category = useSelector(state => state.category);
    // console.log(category)
    const renderCategory = (categories) => {
        let category_list = [];
        for (var category of categories) {
            category_list.push(
                <li className="category" key={category.name}>
                    {category.name}
                    {category.children.length > 0 ? (<ul>{renderCategory(category.children)} </ul>) : null}
                </li>

            )
        }
        return category_list;
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
    const handleCategoryImage = (e) => {
        setCategoryImage(e.target.files[0]);
        console.log(e.target.files)
    }
    const handleCreateCategoryForm = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append("parentId", parentId);
        formData.append("categoryImage", categoryImage)
        console.log(formData)
        // console.log(formData.get("categoryImage"))
        dispatch(addCategory(formData));
        setParentCategoryId('');
        setCategoryItem('');
        setCategoryImage('');
        setToggleCategoryForm("none");
    }
    useEffect(() => {
        dispatch(getAllCategory())
    });
    return (
        <>
            <div className="page-container">
                <Sidenav />
                <div className="main-form-container fade-in">

                    <div className="main-container">
                        <div className="page-header">
                            <h1>Category</h1>
                            <button className="btn" onClick={() => setToggleCategoryForm("block")}>add category</button>
                        </div>
                        <div className="modal-form" style={{ display: toggleCategoryForm }}>
                            <form action="" onSubmit={handleCreateCategoryForm}>
                                <div className="form-header">
                                    <h4>add category</h4>
                                    <span className='close' onClick={() => setToggleCategoryForm("none")}><CloseIcon/></span>
                                </div>
                                <input className="form-input" value={name} placeholder={"category name"} name="name" onChange={(e) => setCategoryItem(e.target.value)} type="text" />
                                <select value={parentId} onChange={(e) => setParentCategoryId(e.target.value)} className="form-input">
                                    <option >select category</option>
                                    {
                                        createCategoryList(category.categories).map(option =>
                                            <option key={option.value} value={option.value}>{option.name}</option>)
                                    }
                                </select>
                                <div className="picture-container">
                                    { categoryImage &&

                                        <div className="preview-image category-preview-img">
                                            <img src={URL.createObjectURL(categoryImage)} alt={"category"} />
                                        </div>
                                    }
                                </div>
                                <input type="file" name="categoryImage" onChange={handleCategoryImage} />
                                <div className="buttons">
                                    <div className="form-btn" onClick={() => setToggleCategoryForm("none")}>cancel</div>
                                    <button className='form-btn' type="submit">submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <ul className="categories">
                        {renderCategory(category.categories)}

                    </ul>
                </div>

            </div>
        </>
    )
}

export default Category;