import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";

import { listProducts } from "../actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useParams } from "react-router-dom";
import Paginate from "../components/Paginate";
import ProductCarousel from "../components/ProductCarousel";
import { Link } from "react-router-dom";
import Meta from "../components/Meta";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Colors from "../components/Colors";
import { Typography } from "@mui/material";
import { WISHLIST_ADD_ITEM_RESET } from "../constants/wishlistConstants";
import { useAlert } from "react-alert";


const AccScreen = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const params = useParams();
  // console.log("p",params)
  const keyword = params.keyword;

  const pageNumber = params.pageNumber || 1;

  const wishlistAddItem = useSelector((state) => state.wishlistAddItem);
  const {
    loading: addLoading,
    wish,
    error: addError,
    success: addSuccess,
  } = wishlistAddItem;

  useEffect(() => {
    if (addSuccess) {
      alert.success("Product Added To Wishlist ");
      dispatch({ type: WISHLIST_ADD_ITEM_RESET });
    } else if (addError) {
      alert.error(addError);
      dispatch({ type: WISHLIST_ADD_ITEM_RESET });

    }
  }, [addSuccess, alert, dispatch, addError]);

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  return (
    <>
      <Meta />
      
      {/* {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to='/' className='btn btn-light'>
          Go Back
        </Link>
      )} */}
      <div>
        <div style={{ fontSize: '50px', fontWeight: 'bold', color: "white", marginLeft: '450px' }}>
          About Auto Swap
        </div>
        <div style={{ fontSize: '30px', fontWeight: 'bold', color: "white", marginTop: '20px' }}>
          AutoSwap is your go-to destination for all things related to buying and selling cars. Our website is designed to make the process simple, straightforward, and hassle-free.

          Whether you're looking to sell your current car or find a new one, we've got you covered. We provide a platform where car owners and buyers can connect with ease, helping you make the best decisions for your automotive needs.
        </div>
        <div style={{ fontSize: '30px', fontWeight: 'bold', color: "white", marginTop: '20px' }}>
          What sets AutoSwap apart is our commitment to transparency and convenience. We offer user-friendly tools to help you list your car for sale, or search for the perfect vehicle to buy. Plus, we provide helpful resources and information to guide you through the entire process.

          At AutoSwap, we believe in making car transactions as smooth as possible. We're here to simplify the car buying and selling experience, so you can get back on the road with confidence. Join our community today, and let's make your car dreams a reality
        </div>
        <div style={{margin: '80px'}}>
          <p style={{fontSize: '28px',color: "white", fontWeight:'bold', textAlign:'justify', background:'#605ca8', padding:'20px' , borderRadius:'20px'}}>1. Our website is designed with simplicity in mind. Whether you're a first-time car buyer or a seasoned seller, you'll find it easy to navigate and use our platform. We believe in making the car trading process accessible to everyone.</p>
          <p style={{fontSize: '28px',color: "white", fontWeight:'bold', textAlign:'justify', background:'#d81b60', padding:'20px' , borderRadius:'20px'}}>2. AutoSwap features a wide range of car listings. Whether you're interested in brand new vehicles, used cars, or even special deals, you'll find a diverse selection to choose from. Our listings cover various makes, models, and price ranges to suit your preferences.</p>
          <p style={{fontSize: '28px',color: "white", fontWeight:'bold', textAlign:'justify', background:'#ff851b', padding:'20px' , borderRadius:'20px'}}>3. Each car listing on AutoSwap provides comprehensive details about the vehicle. You can view high-quality images, read descriptions, and check out important specs, so you're well-informed before making a decision.</p>
          <p style={{fontSize: '28px',color: "white", fontWeight:'bold', textAlign:'justify', background:'#39cccc', padding:'20px' , borderRadius:'20px'}}>4. AutoSwap encourages transparency in pricing. Sellers are encouraged to provide fair and competitive prices, and buyers can use our tools to compare prices and make informed decisions.</p>
          <p style={{fontSize: '28px',color: "white", fontWeight:'bold', textAlign:'justify', background:'#3d9970', padding:'20px' , borderRadius:'20px'}}>5. For sellers, we offer a straightforward listing process. Just provide the necessary details, and your car will be visible to potential buyers in no time.</p>
          <p style={{fontSize: '28px',color: "white", fontWeight:'bold', textAlign:'justify', background:'#f583ca', padding:'20px' , borderRadius:'20px'}}>6. AutoSwap has a vibrant community of car enthusiasts and experts. If you have questions or need assistance, our support team and the AutoSwap community are here to help.</p>
        </div>
      </div>
      
      {/* <h1></h1> */}
      <ToastContainer />
      
    </>
  );
};

export default AccScreen;
