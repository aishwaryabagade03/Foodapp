import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import heroimg from "../assets/Homeimg/hero_section.jpg";
import Form from 'react-bootstrap/Form';

function Headersection() {
  return (
    <Container fluid>
      <Row>
        <Col md={12} className='p-0 headerimg text-center' style={{ position: 'relative' }}>
          <div style={{
            backgroundImage: `url(${heroimg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '560px',
          }}>
            <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', height: "560px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: 'white', position: 'absolute', top: '0', left: '0', right: '0' }}>
              <h1>Discover the best food & drinks in town!</h1>
              <Form style={{ width: "50%" }}>
                <Form.Control size="lg" type="text" placeholder="Search" />
              </Form>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Headersection;


