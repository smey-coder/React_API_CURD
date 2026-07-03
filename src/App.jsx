import { BrowserRouter, Routes, Route } from "react-router-dom"; // For Routing
import { ToastContainer } from "react-toastify"; //For Messages
import "react-toastify/dist/ReactToastify.css"; // For Styles css

import Home from "./pages/Home";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddProduct />} />
          <Route path="/edit/:id" element={<EditProduct />} />
        </Routes>
      </BrowserRouter>

      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        theme="colored"
        newestOnTop
        closeOnClick
      />
    </>
  );
}

export default App;