import axios from "axios";

export const getRestaurant =()=>{
  return(dispatch)=>{
    dispatch({type: "GET_RESTAURANT_PENDING"});
    axios
    .get("http://localhost:5000/Restaurant/allrestaurants")
    .then((res)=>{
      console.log(res);
      dispatch({type: "GET_RESTAURANT_SUCCESS", payload: res.data.data});
    })
    .catch((err)=>{
      console.log(err);
      dispatch({type: "GET_RESTAURANT_FAILED", payload: err.message});
    })
  }
}

export const singleRestaurant =(restaurantid)=>{
  return(dispatch)=>{
    dispatch({type: "SINGLE_RESTAURANT_PENDING"});
    axios
    .get(`http://localhost:5000/Restaurant/singlerestaurant/${restaurantid}`)
    .then((res)=>{
      console.log(res);
      dispatch({type: "SINGLE_RESTAURANT_SUCCESS", payload: res.data.data});
    })
    .catch((err)=>{
      console.log(err);
      dispatch({type: "SINGLE_RESTAURANT_FAILED", payload: err.message});
    })
  }
}