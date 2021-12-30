import { productsConstants } from "../actions/constant";

const initialState = {
    products : [],
    loading: false,
    error: null
}
const product = (state = initialState,action) => {
    switch(action.type){
        case productsConstants.GET_ALL_PRODUCTS_SUCCESS:
            state = {
                ...state,
                products: action.payload.products,
                loading:false
            }
        break;
        case productsConstants.ADD_PRODUCT_REQUEST:
            state={
                ...state,
                loading: true
            }
        break;
        case productsConstants.ADD_PRODUCT_SUCCESS:
            state={
                ...state,
                loading:false,
                products: action.payload.products
            }
        break;
        case productsConstants.ADD_PRODUCT_FAILURE:
            state={
                ...state,
                loading: false,
                error: action.payload.error
            }
    }
    return state;
};

export default  product;