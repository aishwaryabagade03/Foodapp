import axios from "axios";

export const addtocart =(userid, foodid)=>{
  return(dispatch)=>{
    dispatch({type: "ADD_CART_PENDING"});
    axios
    .post("http://localhost:5000/Cart/addtocart" ,{ userid, foodid})
    .then((res)=>{
      console.log(res);
      dispatch({type: "ADD_CART_SUCCESS", payload: res.data.data});
    })
    .catch((err)=>{
      console.log(err);
      console.log(userid,foodid)
      dispatch({type: "ADD_CART_FAILED", payload: err.message});
    })
  }
}

export const allcartitems =(userid)=>{
  return(dispatch)=>{
    dispatch({type: "GET_CART_PENDING"});
    axios
    .get(`http://localhost:5000/Cart/allcartitems/${userid}`)
    .then((res)=>{
      console.log(res);
      dispatch({type: "GET_CART_SUCCESS", payload: res.data.data});
    })
    .catch((err)=>{
      console.log(err);
      dispatch({type: "GET_CART_FAILED", payload: err.message});
    })
  }
}

export const incrementQuantity = (cartid, foodid) => {
  return (dispatch) => {
    dispatch({ type: "UPDATE_CART_PENDING" });
    axios
      .put(`http://localhost:5000/Cart/updatequantity/${cartid}`, {
        updatetype: "increment",
        foodid: foodid,
      })
      .then((res) => {
        console.log(res);
        dispatch({ type: "UPDATE_CART_SUCCESS", payload: res.data.data });
      })
      .catch((err) => {
        console.error(err);
        dispatch({ type: "UPDATE_CART_FAILED", payload: err.message });
      });
  };
};

export const decrementQuantity = (cartid, foodid) => {
  return (dispatch) => {
    dispatch({ type: "UPDATE_CART_PENDING" });
    axios
      .put(`http://localhost:5000/Cart/updatequantity/${cartid}`, {
        updatetype: "decrement",
        foodid: foodid,
      })
      .then((res) => {
        console.log(res);
        dispatch({ type: "UPDATE_CART_SUCCESS", payload: res.data.data });
      })
      .catch((err) => {
        console.error(err);
        dispatch({ type: "UPDATE_CART_FAILED", payload: err.message });
      });
  };
};


// export const updatequantity = (cartid, updateType, foodid) => {
//   return(dispatch)=>{
//     dispatch({type: "UPDATE_CART_PENDING"});
//     axios
//     .put(`http://localhost:5000/Cart/updatequantity/${cartid}`, { updatetype: updateType, foodid: foodid })
//     .then((res)=>{
//       console.log(res);
//       dispatch({type: "UPDATE_CART_SUCCESS", payload: res.data.data});
//     })
//     .catch((err)=>{
//       console.log(err);
//       dispatch({type: "UPDATE_CART_FAILED", payload: err.message});
//     })
//   }
// };


export const deletequantity = (cartid) => {
  return(dispatch)=>{
    dispatch({type: "DELETE_QUANTITY_PENDING"});
    axios
    .delete(`http://localhost:5000/Cart/deletequantity/${cartid}`)
    .then((res)=>{
      console.log(res);
      dispatch({type: "DELETE_QUANTITY_SUCCESS", payload: res.data.data});
    })
    .catch((err)=>{
      console.log(err);
      dispatch({type: "DELETE_QUANTITY_FAILED", payload: err.message});
    })
  }
};

export const removecartitems = (cartid) => {
  return (dispatch) => {
    return new Promise(async (resolve, reject) => {
      try {
        dispatch({ type: "DELETE_CART_PENDING" });

        axios
          .delete(`http://localhost:5000/Cart/removecartitem/${cartid}`)
          .then((res) => {
            console.log(res);
            dispatch({ type: "DELETE_CART_SUCCESS", payload: res.data.data });
            resolve("Item removed successfully");
          })
          .catch((error) => {
            dispatch({ type: "DELETE_CART_FAILED", payload: error.message });
            reject(error);
          });
      } catch (error) {
        dispatch({ type: "DELETE_CART_FAILED", payload: error.message });
        reject(error);
      }
    });
  };
};

