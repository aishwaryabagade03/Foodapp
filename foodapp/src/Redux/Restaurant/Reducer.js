const initialState = {
  restaurants: [],
  restaurant: {},
  success: false,
  error: null,
  isLoading: false,
};

 const restaurantReducer = (state=initialState, action)=>{
  switch (action.type){
    case"GET_RESTAURANT_PENDING":
    return{
      ...state,
      isLoading:true,
    };
    case"GET_RESTAURANT_SUCCESS":
    return{
      ...state,
      isLoading: false,
      restaurants: action.payload,
    };
    case"GET_RESTAURANT_FAILED":
    return{
      ...state,
      isLoading:false,
      error: action.payload,
    };
    case"SINGLE_RESTAURANT_PENDING":
    return{
      ...state,
      isLoading:true,
    };
    case"SINGLE_RESTAURANT_SUCCESS":
    return{
      ...state,
      isLoading: false,
      restaurants: action.payload,
    };
    case"SINGLE_RESTAURANT_FAILED":
    return{
      ...state,
      isLoading:false,
      error: action.payload,
    };
    default:
      return state;
  }
}


export default restaurantReducer