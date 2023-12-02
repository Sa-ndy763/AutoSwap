
import { Container } from "react-bootstrap";
import "./index.css";
import HomeScreen from "./screens/HomeScreen";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProductScreen from "./screens/ProductScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ProductListScreen from "./screens/ProductListScreen"
import UserEditScreen from './screens/UserEditScreen'
import ProductEditScreen from './screens/ProductEditScreen'
import Wishlist from "./screens/Wishlist";
import CategoryWiseProduct from "./screens/CategoryWiseProduct";
import { ThemeProvider } from '@mui/material/styles';
import { StyledEngineProvider } from '@mui/styled-engine';
import theme from "./components/Theme";
import "./StylesUI.css"
import NewHeader from "./components/ui/NewHeader";
import { useState } from "react";
import Colors from "./components/ui/Color";
import NewFooter from "./components/ui/NewFooter";
import AccScreen from "./screens/AccScreen";
import ScrollToTop from "./components/ui/ScrollToTop";
import ScrollTop from "./components/ui/ScrollTop";
import CarScreen from "./screens/CarScreen";



function App(props) {
  const [value,setValue] = useState(0);
  const [selectedIndex,setSelectedIndex] = useState(0)
  return (
    <StyledEngineProvider injectFirst>
    <ThemeProvider theme={theme} >
    <Router>
      <div style={{backgroundColor:Colors.DarkBlue ,height:'100%',width:'100%',}}>
      <ScrollTop  showBelow={120} />
        <NewHeader   {...props}
      value={value}
          setValue={setValue}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}/>
        {/* <Header /> */}
        <ScrollToTop />
        
        <main className="py-3">
          <Container  fluid style={{paddingRight:'5%',paddingLeft:'5%'}}>
            <Routes>

              <Route path='/user/productlist' exact element={<ProductListScreen />} />
              <Route path='/user/productlist/:pageNumber' exact element={<ProductListScreen />} />

              <Route path='/user/product/:id/edit' element={<ProductEditScreen />} />
              <Route path="/user/user/:id/edit" element={<UserEditScreen />} />
              <Route path="/" element={<HomeScreen />} />
              <Route path="/cars" element={<CarScreen />} />
              <Route path="/aboutus" element={<AccScreen />} />
              <Route path="/login" element={<LoginScreen />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/register" element={<RegisterScreen />} />
              <Route path="/profile" element={<ProfileScreen />} />
              <Route path="/product/:id" element={<ProductScreen />} />


              <Route path='/search/:keyword' element={<HomeScreen />} />
              <Route path='/page/:pageNumber' element={<HomeScreen />} />
              <Route path='/search/:keyword/page/:pageNumber' exact element={<HomeScreen />} />

              <Route path='/category/:category/:brand' element={<CategoryWiseProduct />}  />
             
            </Routes>
          </Container>
        </main>
        <NewFooter/>
        {/* <Footer /> */}
      </div>
    </Router>
    </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App;
