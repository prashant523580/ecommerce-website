const {orderConstant} = require("../actions/constant");
const initState = {
    loading: false,
    error: null,
    order :[],

}

const order = (state = initState,action) => {
    switch(action.type){
        // case orderConstant.UPDATE_ORDER_REQUEST:
        //     state={
        //         ...state,
        //         loading:true
        //     }
        //     break;
        // case orderConstant.UPDATE_ORDER_SUCCESS:
        //     state={
        //         ...state,
        //         order: action.payload.orders,
        //         loading: false
        //     }
        //     break;
        // case orderConstant.UPDATE_ORDER_FAILURE:
        //     state={
        //         ...initState,
        //         error: action.payload.error,
        //         loading: false
        //     }
            // break; 
            case orderConstant.GET_ORDER_REQUEST:
            state={
                ...state,
                loading:true
            }
            break;
        case orderConstant.GET_ORDER_SUCCESS:
            state={
                ...state,
                order: action.payload.orders,
                loading: false
            }
            break;
        case orderConstant.GET_ORDER_FAILURE:
            state={
                ...initState,
                error: action.payload.error,
                loading: false
            }
            break;
        }
        return state;
}

export default order;