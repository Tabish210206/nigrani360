import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Overview from './pages/Overview';
import SiteDetail from './pages/SiteDetail';
import DashboardLayout from './layouts/DashboardLayout';
import ModulePage from './pages/ModulePage';
import Reports from './pages/Reports';
import CCTVCommand from './pages/CCTVCommand';
import DemoControl from './pages/DemoControl';
import Assignments from './pages/Assignments';
import RegionalMap from './pages/RegionalMap';
import FundTrace from './pages/FundTrace';
import Alerts from './pages/Alerts';
import Projects from './pages/Projects';
import Assets from './pages/Assets';
import Verification from './pages/Verification';
import NGOPortal from './pages/NGOPortal';
import FieldInspectorDashboard from './pages/FieldInspectorDashboard';
import NationalInspections from './pages/NationalInspections';
import { useAuth } from './context/AuthContext';
import AppSplashScreen from './components/AppSplashScreen';

// Smart component: renders inspector view for field officer, national view for PMU director
function RoleAwareInspections() {
  const { user } = useAuth();
  if (user?.role === 'FIELD_INSPECTOR') {
    return <FieldInspectorDashboard />;
  }
  return <NationalInspections />;
}

// Redirects logged-in users to their role-specific dashboard when hitting "/"
function RoleDefaultRedirect() {
  const { user, isAuthenticated } = useAuth();
  if (!isAuthenticated || !user) return <Navigate to="/login" replace />;
  if (user.role === 'PMU_DIRECTOR') return <Navigate to="/overview" replace />;
  if (user.role === 'FIELD_INSPECTOR') return <Navigate to="/inspections" replace />;
  if (user.role === 'NGO_INSTITUTE') return <Navigate to="/ngo-portal" replace />;
  return <Navigate to="/login" replace />;
}

function App() {
  return (
    <BrowserRouter>
      {/* Animated Splash Screen with Logo on website load/reload */}
      <AppSplashScreen />

      <Routes>
        {/* Public Login */}
        <Route path="/login" element={<Login />} />

        {/* Protected Dashboard Shell */}
        <Route path="/" element={<DashboardLayout />}>
          {/* Index: redirect based on authenticated user's role */}
          <Route index element={<RoleDefaultRedirect />} />

          {/* PMU Director routes */}
          <Route path="overview"          element={<Overview />} />
          <Route path="site/:id"          element={<SiteDetail />} />
          <Route path="projects"          element={<Projects />} />
          <Route path="verification"      element={<Verification />} />
          <Route path="beneficiaries"     element={<ModulePage />} />
          <Route path="complaints"        element={<ModulePage />} />
          <Route path="assets"            element={<Assets />} />
          <Route path="corrective-action" element={<ModulePage />} />
          <Route path="reports"           element={<Reports />} />
          <Route path="users"             element={<ModulePage />} />
          <Route path="geography"         element={<ModulePage />} />
          <Route path="rules"             element={<ModulePage />} />
          <Route path="demo"              element={<DemoControl />} />
          <Route path="health"            element={<ModulePage />} />
          <Route path="admin"             element={<ModulePage />} />
          <Route path="sakshyachain"      element={<ModulePage />} />

          {/* Role-smart routes: content changes dynamically based on role */}
          <Route path="map"          element={<RegionalMap />} />
          <Route path="inspections"  element={<RoleAwareInspections />} />
          <Route path="assignments"  element={<Assignments />} />
          <Route path="alerts"       element={<Alerts />} />
          <Route path="cctv"         element={<CCTVCommand />} />
          <Route path="fundtrace"    element={<FundTrace />} />

          {/* NGO portal route */}
          <Route path="ngo-portal"   element={<NGOPortal />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
