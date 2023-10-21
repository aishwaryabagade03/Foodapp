const initialState = {
  foods: [],
  food: {},
  success: false,
  error: null,
  isLoading: false,
};

 const foodReducer = (state=initialState, action)=>{
  switch (action.type){
    case"GET_FOOD_PENDING":
    return{
      ...state,
      isLoading:true,
    };
    case"GET_FOOD_SUCCESS":
    return{
      ...state,
      isLoading: false,
      foods: action.payload,
    };
    case"GET_FOOD_FAILED":
    return{
      ...state,
      isLoading:false,
      error: action.payload,
    };
    case"SINGLE_FOOD_PENDING":
    return{
      ...state,
      isLoading:true,
    };
    case"SINGLE_FOOD_SUCCESS":
    return{
      ...state,
      isLoading: false,
      foods: action.payload,
    };
    case"SINGLE_FOOD_FAILED":
    return{
      ...state,
      isLoading:false,
      error: action.payload,
    };
    default:
      return state;
  }
}


export default foodReducer