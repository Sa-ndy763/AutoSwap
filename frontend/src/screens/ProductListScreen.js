import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Product from "../components/Product";
import { Table, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

import Meta from "../components/Meta";
import {
  listProducts,
  deleteProduct,
  createProduct,
} from "../actions/productActions";
import { PRODUCT_CREATE_RESET } from "../constants/productConstants";
import Paginate from "../components/Paginate";
import { useParams } from "react-router-dom";
import Colors from "../components/Colors";
import { Typography } from "@mui/material";

const ProductListScreen = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const params = useParams();
  const keyword = params.keyword;
  const pageNumber = params.pageNumber || 1;

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET });

    if (!userInfo) {
      Navigate("/login");
    }
    if (successCreate) {
      Navigate(`/user/product/${createdProduct._id}/edit`);
    } else {
      dispatch(listProducts("", pageNumber));
    }
  }, [
    dispatch,
    Navigate,
    userInfo,
    successDelete,
    successCreate,
    createdProduct,
    pageNumber,
  ]);
  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure")) {
      // DELETE PRODUCTS
      dispatch(deleteProduct(id));
    }
  };

  const createProductHandler = (product) => {
    //   CREATE PRODUCT
    dispatch(createProduct());
  };

  return (
    <>
      <Row className="align-items-center" style={{marginBottom:'1.5em'}}>
        <Col>
          <Typography variant="h4" >Cars</Typography>
        </Col>
        <Col className="text-right">
          <Button className="my-3" onClick={createProductHandler} style={{backgroundColor:Colors.orange}}>
            <i className="fas fa-plus"></i> Sell Your Car
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant="danger">{errorCreate}</Message>}
      
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <div>
      <Meta />
      {!keyword ? (
        <>
          
        </>
      ) : (
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
          <Typography variant="h4" style={{ marginTop: "3em" }}>
            Search Results
          </Typography>
        </>
      )}

      <ToastContainer />


      {products.length === 0 ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row>
            {products.slice(0, 8).map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          {products.length !== 0 ? (
            <></>
          ) : (
            <Typography
              variant="h5"
              style={{
                textTransform: "none",
                color: Colors.orange,
              }}
            >
              We couldn't find any matches
            </Typography>
          )}
          {/* <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ""}
          /> */}
        </>
      )}
      {/* <Typography variant="h4">Brands</Typography> */}
      
    </div>
          <Paginate pages={pages} page={page}  />
        </>
      )}
    </>
  );
};

export default ProductListScreen;
