const initialState = {
  categories: [],
  category: {},
  success: false,
  error: null,
  isLoading: false,
};

 const categoryReducer = (state=initialState, action)=>{
  switch (action.type){
    case"GET_CATEGORY_PENDING":
    return{
      ...state,
      isLoading:true,
    };
    case"GET_CATEGORY_SUCCESS":
    return{
      ...state,
      isLoading: false,
      categories: action.payload,
    };
    case"GET_CATEGORY_FAILED":
    return{
      ...state,
      isLoading:false,
      error: action.payload,
    };
    default:
      return state;
  }
}


export default categoryReducer