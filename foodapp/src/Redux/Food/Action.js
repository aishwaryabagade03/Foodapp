import axios from "axios";

export const getfood =()=>{
  return(dispatch)=>{
    dispatch({type: "GET_FOOD_PENDING"});
    axios
    .get("http://localhost:5000/Food/allfood")
    .then((res)=>{
      console.log(res);
      dispatch({type: "GET_FOOD_SUCCESS", payload: res.data.data});
    })
    .catch((err)=>{
      console.log(err);
      dispatch({type: "GET_FOOD_FAILED", payload: err.message});
    })
  }
}

export const singlefood =(foodid)=>{
  return(dispatch)=>{
    dispatch({type: "SINGLE_FOOD_PENDING"});
    axios
    .get(`http://localhost:5000/Food/singlefood/${foodid}`)
    .then((res)=>{
      console.log(res);
      dispatch({type: "SINGLE_FOOD_SUCCESS", payload: res.data.data});
    })
    .catch((err)=>{
      console.log(err);
      dispatch({type: "SINGLE_FOOD_FAILED", payload: err.message});
    })
  }
}