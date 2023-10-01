import Details from "./modules/Details";
import Home from "./modules/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Tickets from "./modules/Tickets";
import NotFound from "./components/NotFound/NotFound";
import MainLayout from "./layouts/MainLayout/MainLayout";
import Signin from "./modules/Auth/pages/Signin";
import Signup from "./modules/Auth/pages/Signup";
import UserProvider from "./contexts/UserContext/UserContext";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            {/* TRANG HOME  */}
            <Route index element={<Home />} />
            {/* TRANG DETAIL  */}
            <Route path="movies/:movieId" element={<Details />} />
            {/* TRANG VÉ  */}
            <Route path="tickets/:showtimeId" element={<Tickets />} />
            {/* TRANG ĐĂNG KÝ */}
            <Route path="/sign-up" element={<Signup />} />
            {/* TRANG ĐĂNG NHẬP */}
            <Route path="/sign-in" element={<Signin />} />
          </Route>

          {/* TRANG NOT FOUND */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
