import { CategoryConstants } from "../actions/constant";

const initState = {
    categories: [],
    loading: false,
    error: null,
    message: "" 
};

//common category push
const buildNewCategories = (parentId, categories, category) => {
    let newCategories = [];
    if (parentId === undefined) {
        return [
            ...categories, {
                _id: category._id,
                name: category.name,
                slug: category.slug,
                type:category.type,
                children: []
            }
        ]
    }
    for (let cate of categories) {
        if (cate._id === parentId) {
            let newCategory = {
                _id: category._id,
                name: category.name,
                slug: cate.slug,
                parentId: category.parentId,
                type: category.type,
                children: [],

            };
            newCategories.push({
                ...cate,
                children: cate.children.length > 0 ? [...cate.children,newCategory] : [newCategory]
            })
        } else {

            newCategories.push({
                ...cate,
                children: cate.children ? buildNewCategories(parentId, cate.children, category) : [],

            })
        }
    }
    return newCategories;
}
export default (state = initState, action) => {
    switch (action.type) {
        case CategoryConstants.GET_CATEGORY_SUCCESS:
            state = {
                ...state,
                categories: action.payload.categories
            }
            break;
        case CategoryConstants.ADD_CATEGORY_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case CategoryConstants.ADD_CATEGORY_SUCCESS:
            const category = action.payload.category;
            console.log(category)
            const updateCategory = buildNewCategories(category.parentId, state.categories, category);
                console.log(updateCategory)
            state = {
                ...state,
                categories: updateCategory,
                loading: false,
            }
            break;
        case CategoryConstants.ADD_CATEGORY_FAILURE:
            state = {
                ...initState
            }
            break;
        case CategoryConstants.DELETE_CATEGORY_SUCCESS:
            state = {
                ...initState,
                message : action.payload.message
            }
            break;
        case CategoryConstants.UPDATE_CATEGORY_REQUEST:
            state ={
                ...initState,
                loading: true
            }
            break;
        case CategoryConstants.UPDATE_CATEGORY_SUCCESS:
            state  = {
                ...initState,
                loading: false
            }
            break;
        case CategoryConstants.UPDATE_CATEGORY_FAILURE:
            state = {
                ...initState,
                error: action.payload.error,
                loading: false
            }
            break;
    }
    return state;
}