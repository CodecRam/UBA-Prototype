import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'

// Operative
import OperativeDashboard from './pages/operative/Dashboard'
import OperativeTasks from './pages/operative/Tasks'
import OperativeIncidents from './pages/operative/Incidents'
import OperativeKnowledge from './pages/operative/Knowledge'
import OperativeProfile from './pages/operative/Profile'

// Zone Supervisor
import SupervisorDashboard from './pages/supervisor/Dashboard'
import SupervisorWorkforce from './pages/supervisor/Workforce'
import SupervisorAccess from './pages/supervisor/Access'
import SupervisorContracts from './pages/supervisor/Contracts'

// Operations Director
import DirectorDashboard from './pages/director/Dashboard'
import DirectorConfig from './pages/director/Config'
import DirectorFinancial from './pages/director/Financial'
import DirectorDigitalTwin from './pages/director/DigitalTwin'

// Asset Coordinator
import CoordinatorDashboard from './pages/coordinator/Dashboard'
import CoordinatorDeliveries from './pages/coordinator/Deliveries'
import CoordinatorInventory from './pages/coordinator/Inventory'
import CoordinatorMaps from './pages/coordinator/Maps'

// Compliance Auditor
import AuditorDashboard from './pages/auditor/Dashboard'
import AuditorMaps from './pages/auditor/Maps'
import AuditorReports from './pages/auditor/Reports'

// Platform Admin
import AdminDashboard from './pages/admin/Dashboard'
import AdminRBAC from './pages/admin/RBAC'
import AdminIntegrations from './pages/admin/Integrations'
import AdminLogs from './pages/admin/Logs'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Field Operative */}
        <Route path="/operative/dashboard" element={<OperativeDashboard />} />
        <Route path="/operative/tasks" element={<OperativeTasks />} />
        <Route path="/operative/incidents" element={<OperativeIncidents />} />
        <Route path="/operative/knowledge" element={<OperativeKnowledge />} />
        <Route path="/operative/profile" element={<OperativeProfile />} />

        {/* Zone Supervisor */}
        <Route path="/zone/supervisor" element={<SupervisorDashboard />} />
        <Route path="/zone/supervisor/workforce" element={<SupervisorWorkforce />} />
        <Route path="/zone/supervisor/access" element={<SupervisorAccess />} />
        <Route path="/zone/supervisor/contracts" element={<SupervisorContracts />} />

        {/* Operations Director */}
        <Route path="/ops/director" element={<DirectorDashboard />} />
        <Route path="/ops/director/config" element={<DirectorConfig />} />
        <Route path="/ops/director/financial" element={<DirectorFinancial />} />
        <Route path="/ops/director/digital-twin" element={<DirectorDigitalTwin />} />

        {/* Asset Coordinator */}
        <Route path="/asset/coordinator" element={<CoordinatorDashboard />} />
        <Route path="/asset/coordinator/deliveries" element={<CoordinatorDeliveries />} />
        <Route path="/asset/coordinator/inventory" element={<CoordinatorInventory />} />
        <Route path="/asset/coordinator/maps" element={<CoordinatorMaps />} />

        {/* Compliance Auditor */}
        <Route path="/compliance/auditor" element={<AuditorDashboard />} />
        <Route path="/compliance/auditor/maps" element={<AuditorMaps />} />
        <Route path="/compliance/auditor/reports" element={<AuditorReports />} />

        {/* Platform Admin */}
        <Route path="/platform/admin" element={<AdminDashboard />} />
        <Route path="/platform/admin/rbac" element={<AdminRBAC />} />
        <Route path="/platform/admin/integrations" element={<AdminIntegrations />} />
        <Route path="/platform/admin/logs" element={<AdminLogs />} />
      </Routes>
    </BrowserRouter>
  )
}
