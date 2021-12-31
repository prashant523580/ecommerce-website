import { productsConstants } from "../actions/constant";

const initialState = {
    products : [],
    productsByPrice : {
        under5k : [],
        under10k: [],
        under20k: [],
        under30k: [],
        // under50k : [],
        under60k: [],
        above60k : []
    },
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
        break;
        case productsConstants.GET_PRODUCT_BY_SLUG_SUCCESS:
            state ={
                ...state,
                loading: false,
                products : action.payload.products,
                productsByPrice: action.payload.productsByPrice
            }
    }
    return state;
};

export default  product;