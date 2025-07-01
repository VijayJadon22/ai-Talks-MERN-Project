import { Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import DashboardPage from "./pages/DashboardPage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "./features/auth/authSlice";
import LoadingSpinner from "./components/LoadingSpinner";
import HistoryPage from "./pages/HistoryPage";

function App() {
  const dispatch = useDispatch();
  const { user, isLoading } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  if (isLoading) {
    return <LoadingSpinner />;
  }
  console.log(user);
  return (
    <>
      <Toaster position="top-center" />
      <div className="min-h-screen w-full border flex flex-col items-center overflow-x-hidden ">
        <Navbar />
        <div className="max-w-3xl flex flex-col items-center justify-center">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/dashboard"
              element={user ? <DashboardPage /> : <Navigate to={"/login"} />}
            />
            <Route
              path="/login"
              element={!user ? <LoginPage /> : <Navigate to={"/"} />}
            />
            <Route
              path="/signup"
              element={!user ? <SignupPage /> : <Navigate to={"/"} />}
            />
            <Route
              path="/history"
              element={user ? <HistoryPage /> : <Navigate to={"/"} />}
            />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
