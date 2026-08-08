import { Routes, Route } from "react-router-dom";

import { Login } from "./pages/Login/Login";
import { Home } from "./pages/Home/Home";

import DashboardLayout from "./pages/Dashboard/DashboardLayout";
import Dashboard from "./pages/Dashboard/component/dashboard/Dashboard";

import Products from "./pages/products/Product";
import ProductsSettings from "./pages/ProductsSetting/ProductsSetting";

import Navbar from "./components/navbar/Navbar";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        {/* Public pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />

        {/* Dashboard application */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          {/* /dashboard */}
          <Route index element={<Dashboard />} />

          {/* /dashboard/products */}
          <Route path="products" element={<Products />} />

          {/* /dashboard/discount */}
          <Route path="discount" element={<ProductsSettings />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;