import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Outlet,
} from "react-router";
import { ToastContainer, Bounce } from "react-toastify";

import App from "./App.jsx";
import LoginPage from "./pages/LoginPage/LoginPage.jsx";
import SignupPage from "./pages/SignupPage/SignupPage.jsx";

import Main from "./pages/Main/Main.jsx";
import UserPage from "./pages/UserPage/UserPage.jsx";
import StatsPage from "./pages/StatsPage/StatsPage.jsx";
import CalendarPage from "./pages/CalendarPage/CalendarPage.jsx";
import UploadPage from "./pages/UploadPage/UploadPage.jsx";
import MapPage from "./pages/MapPage/MapPage.jsx";
import SettingsPage from "./pages/SettingsPage/SettingsPage.jsx";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={
        <>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss={false}
            draggable
            pauseOnHover={false}
            theme="dark"
            transition={Bounce}
          />
          <Outlet />
        </>
      }
    >
      <Route path="login" element={<LoginPage />} />
      <Route path="signup" element={<SignupPage />} />

      <Route path="" element={<App />}>
        <Route path="" element={<Main />} />
        <Route path="me" element={<UserPage />} />
        <Route path="stats" element={<StatsPage />} />
        <Route path="calendar" element={<CalendarPage />} />
        <Route path="upload" element={<UploadPage />} />
        <Route path="map" element={<MapPage />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
