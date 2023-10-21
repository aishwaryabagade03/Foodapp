import React, { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import { getRestaurant } from "../../Redux/Restaurant/Action";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Restaurants = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getRestaurant());
  }, [dispatch]);
  const data = useSelector((state) => state.restaurant.restaurants);
  console.log(data);

  return (
    <Container>
      <Row className="text-left py-5">
        <Col>
         <h2 className="fw-bold">Cafes & Restaurants with online food delivery in Mumbai</h2>
        </Col>
      </Row>
      <Row xs={1} sm={2} md={3} lg={4} xl={5} xxl={4}>
       {data?.map((restaurant)=>(
         <Col key={restaurant.id}>
        <Link to={`/restaurants/${restaurant._id}`}>
        <Card >
           <Card.Img variant="top" src={`http://localhost:5000/Upload/restaurant/${restaurant.thumbnail}`} style={{height:"230px"}} />
           <Card.Body className="text-left">
             <Card.Title>{restaurant.name}</Card.Title>
             <Card.Text className="m-0">{restaurant.cuisines}</Card.Text>
             <Card.Text>{restaurant.location}</Card.Text>
           </Card.Body>
         </Card>
        </Link>
       </Col>
       ))}
      </Row>
    </Container>
  );
};

export default Restaurants;
