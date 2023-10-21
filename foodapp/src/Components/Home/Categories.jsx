import React, { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import { getCategory } from "../../Redux/Category/Action";
import { useDispatch, useSelector } from "react-redux";

const Categories = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);
  const data = useSelector((state) => state.category.categories);
  console.log(data);

  return (
    <Container className="border-bottom ">
      <Row className="g-4 pb-5">
        <Col className="categoryrow text-center fw-semibold">
          {data?.map((category) => (
            <Card style={{ width: "12rem", border:"none" }} key={category.id}>
              <Card.Img variant="top" style={{borderRadius:"50%"}} src={`http://localhost:5000/Upload/category/${category.image}`} /> {/* Check the image URL */}
              <Card.Body className="p-0">
                <Card.Text>{category.name}</Card.Text>
              </Card.Body>
            </Card>
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default Categories;

