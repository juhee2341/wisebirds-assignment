import { Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";
import { MainLayout } from "./Layout";
import { CampaignPage } from "./pages/Campaign/CampaignPage";
import { UserPage } from "./pages/User/UserPage";
import { ErrorPage } from "./pages/Error/ErrorPage";
import { FetchErrorBoundary } from "./components/Error/ErrorBoundary";
import { useUserRole } from "./contexts/userRoleContext";

const AdminRoute = () => {
  const { userRole } = useUserRole();
  const location = useLocation();

  if (userRole !== "admin") {
    return <Navigate to="/campaign" replace state={{ from: location }} />;
  }

  return <Outlet />;
};

function App() {
  return (
    <FetchErrorBoundary>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Navigate to="/campaign" />} />
          <Route path="/campaign" element={<CampaignPage />} />
          <Route element={<AdminRoute />}>
            <Route path="/user" element={<UserPage />} />
          </Route>
          <Route path="/error" element={<ErrorPage />} />
        </Route>
      </Routes>
    </FetchErrorBoundary>
  );
}

export default App;
