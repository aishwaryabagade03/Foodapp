import React, { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import { getfood } from "../../Redux/Food/Action";
import { addtocart, allcartitems } from "../../Redux/Cart/Action";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";


const RestaurantMenu = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getfood());
  }, []);
  const data = useSelector((state) => state.food.foods);
  console.log(data);


  const userid = localStorage.getItem('Userid')
  
  const additems=(foodid , e) =>{
    e.preventDefault()
    console.log(userid,foodid)
   dispatch(addtocart(userid, foodid))
  }
  
  return (
    <section>
      <Container>
        <Row className="justify-content-center">
          <Col>
            <Card>
              <Card.Header>Menu</Card.Header>
              {data?.map((food) => (
                <Card.Body
                  key={food.id}
                  className="borber-bottom border d-flex"
                >
                  <Card.Img
                    src={`http://localhost:5000/Upload/food/${food.thumbnail}`}
                    style={{ width: "10rem" }}
                  />
                  <Card.Text className="ps-3">
                    <h5>{food.name}</h5>
                    <p className="m-0">₹{food.price}</p>
                    <p className="m-0">{food.type}</p>
                    <p>{food.description}</p>
                      <Button
                        type="submit"
                        variant="white"
                        className="border text-danger fw-semibold"
                        onClick={(e)=>{additems(food._id , e)}}
                        
                      >
                        Add +
                      </Button>
                  </Card.Text>
                </Card.Body>
              ))}
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default RestaurantMenu;
