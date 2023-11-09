import {Routes, Route, Navigate} from 'react-router-dom'
import { useSelector } from 'react-redux';
import Layout from "./components/UI/Layout";
import NavBar from "./components/UI/NavBar";

//pages
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Products from "./pages/Products";
import Checkout from "./pages/Checkout";
import Orders from './pages/Orders';
//import NoFound from "./pages/NoFound";

function App() {
  const isLoggedin = useSelector(state => state.auth.loggedin)
  return (
    <div className="bg-accent min-h-screen">
      <NavBar></NavBar>
      <Layout>
      
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/about" element={<About></About>}></Route>
          {!isLoggedin && <Route path="/login" element={<Login></Login>}></Route>}
          {!isLoggedin &&  <Route path="/signup" element={<SignUp></SignUp>}></Route>}
          <Route path="/products/:id" element={<Products></Products>}></Route>
          <Route path="/checkout" element={<Checkout></Checkout>}></Route>
          {isLoggedin && <Route path="/orders" element={<Orders></Orders>}></Route>}
          <Route path="*" element={<Navigate to="/"></Navigate>}></Route>
        </Routes>
      
      </Layout>

    </div>
  );
}

export default App;
