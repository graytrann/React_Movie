import Details from "./modules/Details";
import Home from "./modules/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Tickets from "./modules/Tickets";
import NotFound from "./components/NotFound/NotFound";
import MainLayout from "./layouts/MainLayout/MainLayout";
import Signin from "./modules/Auth/pages/Signin";
import Signup from "./modules/Auth/pages/Signup";
import UserProvider from "./contexts/UserContext/UserContext";
import ProtectedRoute from "./routes/ProtectedRoute/ProtectedRoute";

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
            {/* <Route element={<ProtectedRoute />}> */}
            <Route
              path="tickets/:showtimeId"
              element={
                <ProtectedRoute>
                  <Tickets />
                </ProtectedRoute>
              }
            />
            {/* </Route> */}
          </Route>
          {/* TRANG ĐĂNG KÝ */}
          <Route path="/sign-up" element={<Signup />} />
          {/* TRANG ĐĂNG NHẬP */}
          <Route path="/sign-in" element={<Signin />} />

          {/* TRANG NOT FOUND */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
