const initialState = {
  carts: [],
  cart: {},
  success: false,
  error: null,
  isLoading: false,
};

 const cartReducer = (state=initialState, action)=>{
  switch (action.type){
    case"ADD_CART_PENDING":
    return{
      ...state,
      isLoading:true,
    };
    case"ADD_CART_SUCCESS":
    return{
      ...state,
      isLoading: false,
     carts: action.payload,
    };
    case"ADD_CART_FAILED":
    return{
      ...state,
      isLoading:false,
      error: action.payload,
    };
    case"GET_CART_PENDING":
    return{
      ...state,
      isLoading:true,
    };
    case"GET_CART_SUCCESS":
    return{
      ...state,
      isLoading: false,
     carts: action.payload,
    };
    case"GET_CART_FAILED":
    return{
      ...state,
      isLoading:false,
      error: action.payload,
    };
    case"UPDATE_CART_PENDING":
    return{
      ...state,
      isLoading:true,
    };
    case"UPDATE_CART_SUCCESS":
    return{
      ...state,
      isLoading: false,
     carts: action.payload,
    };
    case"UPDATE_CART_FAILED":
    return{
      ...state,
      isLoading:false,
      error: action.payload,
    };
    case"DELETE_QUANTITY_PENDING":
    return{
      ...state,
      isLoading:true,
    };
    case"DELETE_QUANTITY_SUCCESS":
    return{
      ...state,
      isLoading: false,
     carts: action.payload,
    };
    case"DELETE_QUANTITY_FAILED":
    return{
      ...state,
      isLoading:false,
      error: action.payload,
    };
    case"DELETE_CART_PENDING":
    return{
      ...state,
      isLoading:true,
    };
    case"DELETE_CART_SUCCESS":
    return{
      ...state,
      isLoading: false,
     carts: action.payload,
    };
    case"DELETE_CART_FAILED":
    return{
      ...state,
      isLoading:false,
      error: action.payload,
    };
    default:
      return state;
  }
}


export default cartReducer