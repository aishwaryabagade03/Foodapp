import React, { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import { singleRestaurant } from "../../Redux/Restaurant/Action";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import { MdStar } from 'react-icons/md';

const RestaurantPage = () => {
  const dispatch = useDispatch();
  const { restaurant_id} = useParams();
  useEffect(() => {
    dispatch(singleRestaurant(restaurant_id));
  }, [dispatch, restaurant_id]);
  const data = useSelector((state) => state.restaurant.restaurants);
  console.log(data);
  console.log(restaurant_id)
  return (
    <>
    <Container>
    <Row className="pt-5">
      <Col>
      <Breadcrumb>
      <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
      <Breadcrumb.Item href="/">
        Restaurant
      </Breadcrumb.Item>
      <Breadcrumb.Item active>{data.name}</Breadcrumb.Item>
    </Breadcrumb>
      </Col>
    </Row>
    <Row  xs={2} md={4} lg={6} > 
       <Col >
       <Card className="gs-2 cardimg" >
      <img src={`http://localhost:5000/Upload/restaurant/${data.thumbnail}`} alt="" />
    </Card>
    </Col>
       {data.images && data.images.split(",").map((images, index)=>(
        <Col key={index} >
         <Card className="gs-2 ">
         <img src={`http://localhost:5000/Upload/restaurant/${images}`} alt={`${index + 1}`} />
         </Card>
        </Col>
       ))}
    </Row>
  </Container>
  <Container>
  <Row className="pt-3">
      <Col className="d-flex">
      <h2>{data.name}</h2>
      <Button variant="success" className="fw-semibold ms-3" style={{height:'40px'}}>
       4.2<Badge bg="none"><MdStar/></Badge>
    </Button>
      </Col>
    </Row>
    <Row>
      <Col>
     <div className="text-secondary">
     <p className="m-0">{data.cuisines}</p>
     <p className="m-0">{data.location}</p>
     <p>Open 11am – 12midnight /Mon-Sun</p>
     </div>
      </Col>
    </Row>
  </Container>
    </>
  )
}

export default RestaurantPage