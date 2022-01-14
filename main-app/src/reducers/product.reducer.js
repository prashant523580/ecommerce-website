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
    error: null,
    page: {},
    pageRequest: false,
    productDetails: {},

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
            break;
        case  productsConstants.GET_PRODUCT_PAGE_REQUEST:
            state ={
                ...state,
                pageRequest: true,
            }
            break;
        case productsConstants.GET_PRODUCT_PAGE_SUCCESS:
            state = {
                ...state,
                page: action.payload.page,
                pageRequest: false
            }
            break;

        case productsConstants.GET_PRODUCT_PAGE_FAILURE:
            state ={
                ...state,
                error: action.payload.error,
                pageRequest: false
            }
            break;
        case productsConstants.GET_PRODUCT_DETAILS_BY_ID_REQUEST:
            state={
                ...state,
                loading: true
            }
            break;
        case productsConstants.GET_PRODUCT_DETAILS_BY_ID_SUCCESS:
            state={
                ...state,
                loading: false,
                productDetails: action.payload.productDetails,
            }
            break;
    }
    return state;
};

export default  product;