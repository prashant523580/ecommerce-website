import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCategory, deleteCategoryAction, getAllCategory, updateCategories as updatedCategory } from '../actions/category.action';
import CloseIcon from '@mui/icons-material/Close';
import Sidenav from '../components/SideNav';
import CheckboxTree from "react-checkbox-tree";
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import "./category.css"
import Modal from './ui/modal/Modal';
const Category = () => {
    const [name, setCategoryItem] = useState('');
    const [categoryImage, setCategoryImage] = useState('');
    const [parentId, setParentCategoryId] = useState('');
    const dispatch = useDispatch();
    const [toggleCategoryForm, setToggleCategoryForm] = useState('none');
    const [checked, setChecked] = useState([]);
    const [expanded, setExpanded] = useState([]);
    const [checkedArray, setCheckedArray] = useState([]);
    const [expandedArray, setExpandedArray] = useState([]);
    const [updateCategoryModal, setUpdateCategoryModal] = useState(false);
    const [deleteCategoryModal, setDeleteCategoryModal] = useState(false);
    const category = useSelector(state => state.category);
    // console.log(category)
    const renderCategory = (categories) => {
        let category_list = [];
        for (var category of categories) {
            category_list.push(
                {
                    label: category.name,
                    value: category._id,
                    children: category.children.length > 0 && renderCategory(category.children)
                }
                // <li className="category" key={category.name}>
                //     <label>

                //         <input type="checkbox" />
                //         {category.name}
                //         </label>
                //     {category.children.length > 0 ? (<ul>{renderCategory(category.children)} </ul>) : null}
                // </li>

            )
        }
        return category_list;
    }

    const createCategoryList = (categories, options = []) => {
        for (let category of categories) {
            options.push({
                value: category._id,
                 name: category.name,
                  parentId: category.parentId,
                  type: category.type
            });
            if (category.children.length > 0) {
                createCategoryList(category.children, options)
            }
        }
        return options;
    }
    const handleCategoryImage = (e) => {
        setCategoryImage(e.target.files[0]);
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
    const updateCategories = () => {
        updateCategory();
        setUpdateCategoryModal(true);
    }
    const updateCategory = () => {
        const categories = createCategoryList(category.categories);
        const checkedArray = [];
        const expandedArray = [];
        checked.length > 0 && checked.map((categoryId, ind) => {
            const category = categories.find((category, index) => categoryId === category.value);
            category && checkedArray.push(category);
        })
        expanded.length > 0 && expanded.map((categoryId, ind) => {
            const category = categories.find((category, index) => categoryId === category.value);
            category && expandedArray.push(category);
        })
        setCheckedArray(checkedArray);
        setExpandedArray(expandedArray);
        console.log({checkedArray,expandedArray})
    }

    const handleCategoryInput = (key, value, index, type) => {
        // console.log(name,value,index,type)
        if (type === "checked") {
            const updatedCheckedArray = checkedArray.map((item, ind) => index === ind ? { ...item, [key]: value } : item);
            setCheckedArray(updatedCheckedArray)
        } else if (type === "expanded") {
            const updatedExpandedArray = expandedArray.map((item, ind) => index === ind ? { ...item, [key]: value } : item);
            setExpandedArray(updatedExpandedArray)
        }
    }
    const handleEditCategoryForm = (e) => {
        e.preventDefault();
        let form = new FormData();
        expandedArray.forEach((item, ind) => {
            form.append("name", item.name);
            form.append("_id", item.value);
            form.append("parentId", item.parentId ? item.parentId : "");
            form.append("type", item.type);
        });
        checkedArray.forEach((item, ind) => {
            form.append("name", item.name);
            form.append("_id", item.value);
            form.append("parentId", item.parentId ? item.parentId : "");
            form.append("type", item.type);
        })
        dispatch(updatedCategory(form));
        setUpdateCategoryModal(false)
    }
    const renderDeleteCategoryForm = () => {
        return (
            <Modal
                header="confirm"
                show={deleteCategoryModal}
                close={() => setDeleteCategoryModal(false)}
            >
                <div className="body">

                    <h5>are you sure want to delete</h5>
                    <h4>expanded</h4>
                    <div className="category">

                        {
                            expandedArray.map((item, ind) => <span key={ind}>{item.name} <br /></span>)
                        }
                    </div>
                    <h4>checked</h4>
                    <div className="category">

                        {
                            checkedArray.map((item, ind) => <span key={ind}>{item.name} <br /></span>)
                        }
                    </div>
                </div>
                <div className="btn-content">
                    <button className='btn btn-dark' onClick={() => setDeleteCategoryModal(false)}>cancle</button>
                    <button className='btn btn-danger' onClick={deleteCategory}>delete</button>
                </div>
            </Modal>
        )
    }
    const deleteCategory = () => {
        const isCheckedArray = checkedArray.map((item, ind) => ({ _id: item.value }));
        const isExpandedArray = expandedArray.map((item, ind) => ({ _id: item.value }));

        const ids = isCheckedArray.concat(isExpandedArray);
        if (isCheckedArray.length > 0) {
            dispatch(deleteCategoryAction(isCheckedArray))
                .then(result => {
                    dispatch(getAllCategory());
                })
        }
        setDeleteCategoryModal(false);
        // console.log(category)
    }

    const deleteCategoryUpdate = () => {
        updateCategory();
        setDeleteCategoryModal(true);

    }
    return (
        <>
            <div className="page-container">
                <Sidenav />
                <div className="main-form-container fade-in">

                    <div className="main-container">
                        <div className="page-header">
                            <h1>Category</h1>
                            <div className="buttons">

                            <button className="btn" onClick={() => setToggleCategoryForm("block")}>add category</button>
                            <button className='btn' onClick={deleteCategoryUpdate}>delete</button>
                                <button className='btn' onClick={updateCategories}>edit</button>
                            </div>
                        </div>
                        <div className="modal-form" style={{ display: toggleCategoryForm }}>
                            <form onSubmit={handleCreateCategoryForm}>
                                <div className="form-header">
                                    <h4>add category</h4>
                                    <span className='close' onClick={() => setToggleCategoryForm("none")}><CloseIcon /></span>
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
                                    {categoryImage &&

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
                    <div className="category-container">
                        {
                            updateCategoryModal &&
                            <div className="modal-form modal-form-update" style={{ display: 'block' }}>
                                <form onSubmit={handleEditCategoryForm}>
                                    <div className="form-header">
                                        <h4>expanded</h4>
                                        <span className='close' onClick={() => setUpdateCategoryModal(false)}><CloseIcon /></span>
                                    </div>
                                    {
                                        expandedArray.length > 0 && expandedArray.map((item, index) =>
                                            <div className="form-group" key={index}>

                                                <input className="form-input" value={item.name} placeholder={"category name"} name="name" onChange={(e) => handleCategoryInput("name", e.target.value, index, "expanded")} type="text" />
                                                <select value={item.parentId} onChange={(e) => handleCategoryInput("parentId", e.target.value, index, "expanded")} className="form-input">
                                                    <option >select category</option>
                                                    {
                                                        createCategoryList(category.categories).map(option =>
                                                            <option key={option.value} value={option.value}>{option.name}</option>)
                                                    }
                                                </select>
                                                <select 
                                                value={item.type}
                                                onChange={(e) => handleCategoryInput("type",e.target.value,index,"expanded")}
                                                className='form-input'>
                                                    <option value="">select here</option>
                                                    <option value="page">page</option>
                                                    <option value="product">product</option>
                                                    <option value="store">store</option>
                                                </select>
                                            </div>
                                        )
                                    }
                                    <div className="form-header">
                                        <h4>checked</h4>
                                    </div>
                                    {
                                        checkedArray.length > 0 && checkedArray.map((item, index) =>
                                            <div className="form-group" key={index}>

                                                <input className="form-input" value={item.name} placeholder={"category name"} name="name" onChange={(e) => handleCategoryInput("name", e.target.value, index, "checked")} type="text" />
                                                <select value={item.parentId} onChange={(e) => handleCategoryInput("parentId", e.target.value, index, "checked")} className="form-input">
                                                    <option >select category</option>
                                                    {
                                                        createCategoryList(category.categories).map(option =>
                                                            <option key={option.value} value={option.value}>{option.name}</option>)
                                                    }
                                                </select>
                                                <select 
                                                value={item.type}
                                                onChange={(e) => handleCategoryInput("type",e.target.value,index,"checked")}
                                                className='form-input'>
                                                    <option value="">select here</option>
                                                    <option value="page">page</option>
                                                    <option value="product">product</option>
                                                    <option value="store">store</option>
                                                </select>
                                            </div>
                                        )
                                    }

                                    <div className="buttons">
                                        <div className="form-btn" onClick={() => setUpdateCategoryModal(false)}>cancel</div>
                                        <button className='form-btn' type="submit">submit</button>
                                    </div>
                                </form>
                            </div>
                        }
                        <div className="category-list">

                            <CheckboxTree
                                nodes={renderCategory(category.categories)}
                                checked={checked}
                                expanded={expanded}
                                onCheck={checked => setChecked(checked)}
                                onExpand={expanded => setExpanded(expanded)}
                            />
                            {/* <ul className="categories">
                        {renderCategory(category.categories)}
                        
                    </ul> */}
                            {/* <div className="buttons">
                                <button onClick={deleteCategoryUpdate}>delete</button>
                                <button onClick={updateCategories}>edit</button>
                            </div> */}
                            {renderDeleteCategoryForm()}
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Category;