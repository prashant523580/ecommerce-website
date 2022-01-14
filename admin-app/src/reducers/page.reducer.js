const { PageConstants } = require("../actions/constant")

const initState ={
    loading: false,
    page: {},
    error:null
}

const page = (state =initState,action) => {
    switch(action.type){
        case PageConstants.CREATE_PAGE_REQUEST:
            state = {
                ...state,
                loading:true
            }
            break;
        case PageConstants.CREATE_PAGE_SUCCESS:
            state ={
                ...state,
                page: action.payload.page,
                loading:false
            }
            break;
        case PageConstants.CREATE_PAGE_FAILURE:
            state = {
                loading: false,
                error: action.payload.error
            }
    }
    return state;
}
export default page;