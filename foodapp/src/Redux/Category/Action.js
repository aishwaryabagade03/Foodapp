import axios from "axios";

export const getCategory =()=>{
  return(dispatch)=>{
    dispatch({type: "GET_CATEGORY_PENDING"});
    axios
    .get("http://localhost:5000/Category/allcategory")
    .then((res)=>{
      console.log(res);
      dispatch({type: "GET_CATEGORY_SUCCESS", payload: res.data.data});
    })
    .catch((err)=>{
      console.log(err);
      dispatch({type: "GET_CATEGORY_FAILED", payload: err.message});
    })
  }
}