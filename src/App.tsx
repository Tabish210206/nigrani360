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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Navigate to="/overview" replace />} />
          <Route path="overview" element={<Overview />} />
          <Route path="site/:id" element={<SiteDetail />} />
          
          <Route path="map" element={<RegionalMap />} />
          <Route path="projects" element={<Projects />} />
          <Route path="inspections" element={<ModulePage />} />
          <Route path="assignments" element={<Assignments />} />
          <Route path="alerts" element={<Alerts />} />
          <Route path="cctv" element={<CCTVCommand />} />
          <Route path="verification" element={<ModulePage />} />
          <Route path="beneficiaries" element={<ModulePage />} />
          <Route path="complaints" element={<ModulePage />} />
          <Route path="fundtrace" element={<FundTrace />} />
          <Route path="sakshyachain" element={<ModulePage />} />
          <Route path="assets" element={<Assets />} />
          <Route path="corrective-action" element={<ModulePage />} />
          <Route path="reports" element={<Reports />} />
          <Route path="users" element={<ModulePage />} />
          <Route path="geography" element={<ModulePage />} />
          <Route path="rules" element={<ModulePage />} />
          <Route path="demo" element={<DemoControl />} />
          <Route path="health" element={<ModulePage />} />
          <Route path="admin" element={<ModulePage />} />
          
          <Route path="*" element={<Navigate to="/overview" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
