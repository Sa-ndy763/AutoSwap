import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { Carousel } from "react-bootstrap";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from "react-bootstrap";
// import products from '../products'
import Meta from "../components/Meta";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  listProductsDetails,
  createProductReview,
} from "../actions/productActions";
import { PRODUCT_CREATE_REVIEW_RESET } from "../constants/productConstants";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Colors from "../components/Colors";
import { Typography } from "@mui/material";
import { useAlert } from "react-alert";

const ProductScreen = () => {
  const params = useParams();
  const alert = useAlert();
  const navigate = useNavigate();
  // const history = useHistory();
  const dispatch = useDispatch();
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const productDetails = useSelector((state) => state.productDetails);
  const { error, product } = productDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const {
    success: successProductReview,
    error: errorProductReview,
    loading: loadingProductReview,
  } = productReviewCreate;

  // const product = products.find((p) => p._id === params.id);
  // console.log(product);
  useEffect(() => {
    console.log(product.images);
    if (successProductReview) {
      alert.success("Review Submitted!");
      setRating(0);
      setComment("");
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
      dispatch(listProductsDetails(params.id));
    }
    if (!product._id || product._id !== params.id) {
      dispatch(listProductsDetails(params.id));
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
  }, [params, dispatch, successProductReview, alert, product]);

  

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createProductReview(params.id, {
        rating,
        comment,
      })
    );
  };

  return (
    <>
      <Link
        to="/"
        className="btn btn-light"
        style={{
          backgroundColor: Colors.orange,
          color: Colors.white,
          fontWeight: "bold",
        }}
      >
        Go Back
      </Link>
      {/* <Button onClick={history.goBack}>Back</Button> */}
      {!product._id || product._id !== params.id ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          {/* <ToastContainer /> */}
          <Meta title={product.name} />
          <Row style={{ marginTop: "2em", marginBottom: "2em" }}>
            <Col md={6}>
              {/* <Image src={product.image} alt={product.name} fluid /> */}
              <Carousel
                showThumbs={false}
                renderIndicator={(onClickHandler, isSelected, index, label) => {
                  if (isSelected) {
                    return (
                      <li
                        style={{
                          background: Colors.orange,
                          width: 8,
                          height: 8,
                          display: "inline-block",
                          margin: "0 8px",
                        }}
                        aria-label={`Selected: ${label} ${index + 1}`}
                        title={`Selected: ${label} ${index + 1}`}
                      />
                    );
                  }
                  return (
                    <li
                      style={{
                        background: "rgb(34 43 69)",
                        // borderColor: Colors.SubWhite,
                        backgroundImage:
                          "linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))",
                        boxShadow: "rgb(0 0 0 / 25%) 0px 3px 6px 0px",

                        width: 8,
                        height: 8,
                        display: "inline-block",
                        margin: "0 8px",
                      }}
                      onClick={onClickHandler}
                      onKeyDown={onClickHandler}
                      value={index}
                      key={index}
                      role="button"
                      tabIndex={0}
                      title={`${label} ${index + 1}`}
                      aria-label={`${label} ${index + 1}`}
                    />
                  );
                }}
              >
                <div>
                  <Image
                    src={product.image}
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: 0,
                      padding: 0,
                      margin: 0,
                      marginLeft: 0,
                      marginRight: 0,
                    }}
                    alt={product.name}
                  />
                  {/* <p className="legend">Legend 1</p> */}
                </div>
                {product.images &&
                  product.images.map((img, index) => (
                    <div key={index}>
                      <Image
                        src={img}
                        style={{
                          width: "100%",
                          height: "100%",
                          borderRadius: 0,
                          padding: 0,
                          margin: 0,
                          marginLeft: 0,
                          marginRight: 0,
                        }}
                        alt={img.name}
                      />
                      {/* <p className="legend">Legend 1</p> */}
                    </div>
                    // <Carousel.Item key={index}>
                    //   {/* <Link to={`/product/${img._id}`}> */}
                    //   <Image
                    //     src={img}
                    //     alt={img.name}
                    // style={{
                    //   width: "100%",
                    //   height: "100%",
                    //   borderRadius: 0,
                    //   margin: 0,
                    //   marginLeft: 0,
                    //   marginRight: 0,
                    // }}
                    //   />
                    // </Carousel.Item>
                  ))}

                {/* <div>
                    <img src="assets/2.jpeg" />
                    <p className="legend">Legend 2</p>
                </div>
                <div>
                    <img src="assets/3.jpeg" />
                    <p className="legend">Legend 3</p>
                </div> */}
              </Carousel>
              {/* <Carousel
                nextLabel=""
                prevLabel=""
                pause="hover"
                className="bg-dark"
              >
                
              </Carousel> */}
            </Col>
            <Col md={3} style={{ backgroundColor: Colors.DarkBlue }}>
              <ListGroup
                variant="flush"
                style={{
                  backgroundColor: Colors.DarkBlue,
                  borderColor: Colors.SubWhite,
                }}
              >
                <ListGroup.Item
                  style={{
                    backgroundColor: Colors.DarkBlue,
                    borderColor: Colors.SubWhite,
                  }}
                >
                  <Typography variant="h5" style={{ color: Colors.white }}>
                    {product.name}
                  </Typography>
                </ListGroup.Item>
              
                <ListGroup.Item
                  style={{
                    backgroundColor: Colors.DarkBlue,
                    borderColor: Colors.SubWhite,
                    color: Colors.white,
                  }}
                >
                  Price: ${product.price}
                </ListGroup.Item>
                <ListGroup.Item
                  style={{
                    backgroundColor: Colors.DarkBlue,
                    borderColor: Colors.SubWhite,
                    color: Colors.SubWhite,
                  }}
                >
                  Description: {product.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card
                style={{
                  backgroundColor: Colors.DarkBlue,
                  borderColor: Colors.SubWhite,
                  color: Colors.SubWhite,
                }}
              >
                <ListGroup variant="flush">
                  <ListGroup.Item
                    style={{
                      backgroundColor: Colors.DarkBlue,
                      borderColor: Colors.SubWhite,
                      color: Colors.white,
                    }}
                  >
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>${product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item
                    style={{
                      backgroundColor: Colors.DarkBlue,
                      borderColor: Colors.SubWhite,
                      color: Colors.white,
                    }}
                  >
                    <Row>
                      <Col>Seller Email:</Col>
                      <Col>
                        <strong>{product.email}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item
                    style={{
                      backgroundColor: Colors.DarkBlue,
                      borderColor: Colors.SubWhite,
                      color: Colors.white,
                    }}
                  >
                    <Row>
                      <Col>Seller Phone Number:</Col>
                      <Col>
                        <strong>{product.phone}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  

                  

                  

                  
                </ListGroup>
              </Card>
            </Col>
          </Row>
          
        </>
      )}
    </>
  );
};

export default ProductScreen;
