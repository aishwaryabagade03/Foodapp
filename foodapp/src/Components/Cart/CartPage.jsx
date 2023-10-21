import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import {
  allcartitems,
  removecartitems,
  incrementQuantity,
  decrementQuantity,
} from "../../Redux/Cart/Action";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import { IoTrashOutline } from "react-icons/io5";
import {loadStripe} from '@stripe/stripe-js';


const CartPage = () => {
  const userid = localStorage.getItem("Userid");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(allcartitems(userid));
  }, []);
  const data = useSelector((state) => state.cart.carts);
  console.log(data);

  const increment = (cartid, foodid) => {
    dispatch(incrementQuantity(cartid, "increment", foodid))
  };

  const decrement = (cartid, foodid) => {
    dispatch(decrementQuantity(cartid, "decrement", foodid))
  };

  const removeitem = (cartid) => {
    dispatch(removecartitems(cartid))
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.error("Error removing item: ", error);
      });
  };

  const totalamount = () => {
    if (Array.isArray(data) && data.length > 0) {
      let total = 0;
      data.forEach((food) => {
        total += food.price * food.quantity;
      });
      return total.toFixed(2);
    } else {
      return "0.00";
    }
  };

    // payment integration
    const makePayment = async()=>{
      const stripe = await loadStripe("pk_test_51NuVY0SBwK9ePU2bx6es1qPzC43EW4QkIDInmE9P93Y0wIC12l5QfKyr18ZaDuhA0VEfufeLzsfY6JWtEKIXxMKc00X2Mhp9pN");
  
      const body = {
          foods:data
      }
      const headers = {
          "Content-Type":"application/json"
      }
      const response = await fetch("http://localhost:5000/Cart/checkout",{
          method:"POST",
          headers:headers,
          body:JSON.stringify(body)
      });

      const session = await response.json();
  
      const result = stripe.redirectToCheckout({
          sessionId:session.id
      });
      
      if(result.error){
          console.log(result.error);
      }
  }

  return (
    <>
      <section>
        <Container>
          <Row>
            <Col>
              <Card>
                <Card.Header as="h5">Your Cart</Card.Header>
                {Array.isArray(data) && data.length > 0 ? (
                  data.map((food) => (
                    <Card.Body
                      key={food._id}
                      className="border-bottom border d-flex"
                    >
                      <Card.Img
                        src={`http://localhost:5000/Upload/food/${food.thumbnail}`}
                        style={{ width: "8rem" }}
                      />
                      <Card.Text className="ps-3">
                        <h5>{food.name}</h5>
                        <p className="m-0">₹{food.price}</p>
                        <p className="m-0">{food.type}</p>
                        <div className="d-flex">
                          <Button
                            variant="outline-primary"
                            onClick={() =>
                              decrement(food._id, food.foodId)
                            }
                          >
                            -
                          </Button>
                          <span className="mx-2">{food.quantity}</span>
                          <Button
                            variant="outline-primary"
                            onClick={() =>
                              increment(food._id, food.foodId)
                            }
                          >
                            +
                          </Button>

                          <IoTrashOutline
                            onClick={() => removeitem(food._id)}
                            className="text-danger ms-3 fs-4"
                          />
                        </div>
                      </Card.Text>
                    </Card.Body>
                  ))
                ) : (
                  <p>No items in the cart.</p>
                )}
                <Card.Body>
                  <Card.Text>
                    <div className="d-flex justify-content-between">
                      <p>Subtotal</p>
                      <p>₹{totalamount()}</p>
                    </div>
                    <div className="text-end">
                      <Button variant="primary" onClick={makePayment}>Checkout</Button>
                    </div>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default CartPage;
