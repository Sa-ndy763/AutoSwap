import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productCreateReducer,
  productDeleteReducer,
  productDetailsReducers,
  productListReducers,
  productReviewCreateReducer,
  productTopRatedReducer,
  productUpdateReducer,
} from "./reducers/productReducers";
import {   cartReducers} from "./reducers/cartReducers";
import {
  userDeleteReducer,
  userDetailsReducers,
  userListReducer,
  userLoginReducers,
  userRegisterReducers,
  userUpdateProfileReducer,
  userUpdateReducer,
} from "./reducers/userReducers";
import {
  orderCreateReducer,
} from "./reducers/orderReducers";
import { getWistlistsItemReducer, removeWistlistsItemReducer, wishListAddItemReducer } from "./reducers/wishListReducers";
import { couponCreateReducer} from "./reducers/couponReducers";

const reducer = combineReducers({
  productList: productListReducers,
  productDetails: productDetailsReducers,
  productDelete: productDeleteReducer,
  productCreate:productCreateReducer,
  productUpdate: productUpdateReducer,
  productReviewCreate: productReviewCreateReducer,
  productTopRated: productTopRatedReducer,
  cart: cartReducers,
  userLogin: userLoginReducers,
  userRegister: userRegisterReducers,
  userDetails: userDetailsReducers,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  orderCreate: orderCreateReducer,
  wishlistAddItem:wishListAddItemReducer,
  getWishlistsItem:getWistlistsItemReducer,
  removeWistlistsItem:removeWistlistsItemReducer,
  couponCreate: couponCreateReducer,
});





const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
