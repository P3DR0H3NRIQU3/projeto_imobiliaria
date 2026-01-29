import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Imoveis from "./pages/imoveis";
import Login  from "./pages/Login";
import HomeAdmin  from "./pages/admin/HomeAdmin";
import RegisterImovel from "./pages/admin/RegisterImovel";
function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/imoveis" element={<Imoveis />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<HomeAdmin />} />
          <Route path="/admin/register" element={<RegisterImovel />} />
        </Routes>
      </BrowserRouter>
  )
}

export default App
