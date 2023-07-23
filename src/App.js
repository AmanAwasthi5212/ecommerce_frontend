import Product from "./pages/Product";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart"
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Pay from "./components/payment/pay";
import { useSelector } from "react-redux";

const App = () =>
{
  const user = useSelector(state => state.user.currentUser)
  return(
    <Router>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route path="/products/:category" element={<ProductList/>}/>
        <Route path="/products" element={<ProductList/>}/>
        <Route path="/product" element={<Product/>}/>
        <Route path="/product/:id" element={<Product/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/payment" element={<Pay/>} />
      </Routes>
    </Router>
  );
};

export default App;