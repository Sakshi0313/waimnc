import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AuthProvider } from "@/contexts/AuthContext";
import RequireAuth from "@/components/RequireAuth";
import Index from "./pages/Index";
import { Introduction, History, Structure, Mayor, ChiefOfficer, Corporators } from "./pages/about/AboutPages";
import { Construction, Health, Water, Lights, Encroachment, Tax, Registration, Planning } from "./pages/departments/DepartmentPages";
import { PropertyTax, WaterBill, Complaint, BirthCertificate, DeathCertificate, ConstructionPermit } from "./pages/services/ServicePages";
import { CentralSchemes, StateSchemes, LocalSchemes, PMAY, SwachhBharat } from "./pages/schemes/SchemePages";
import Tenders from "./pages/Tenders";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import LiveSabhaPage from "./pages/LiveSabhaPage";
import AdminLogin from "./pages/AdminLogin";
import AdminLayout from "./pages/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminNotices from "./pages/admin/AdminNotices";
import AdminComplaints from "./pages/admin/AdminComplaints";
import {
  AdminProjects, AdminNews, AdminSabha, AdminRoutine,
  AdminOfficials, AdminGallery, AdminSettings,
} from "./pages/admin/AdminPlaceholders";
import AdminCreateUser from "./pages/admin/AdminCreateUser";
import AdminSetup from "./pages/AdminSetup";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LanguageProvider>        <AuthProvider>        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />

            {/* About */}
            <Route path="/about/introduction" element={<Introduction />} />
            <Route path="/about/history" element={<History />} />
            <Route path="/about/structure" element={<Structure />} />
            <Route path="/about/mayor" element={<Mayor />} />
            <Route path="/about/chief-officer" element={<ChiefOfficer />} />
            <Route path="/about/corporators" element={<Corporators />} />

            {/* Departments */}
            <Route path="/departments/construction" element={<Construction />} />
            <Route path="/departments/health" element={<Health />} />
            <Route path="/departments/water" element={<Water />} />
            <Route path="/departments/lights" element={<Lights />} />
            <Route path="/departments/encroachment" element={<Encroachment />} />
            <Route path="/departments/tax" element={<Tax />} />
            <Route path="/departments/registration" element={<Registration />} />
            <Route path="/departments/planning" element={<Planning />} />

            {/* Services */}
            <Route path="/services/property-tax" element={<PropertyTax />} />
            <Route path="/services/water-bill" element={<WaterBill />} />
            <Route path="/services/complaint" element={<Complaint />} />
            <Route path="/services/birth-certificate" element={<BirthCertificate />} />
            <Route path="/services/death-certificate" element={<DeathCertificate />} />
            <Route path="/services/construction-permit" element={<ConstructionPermit />} />

            {/* Schemes */}
            <Route path="/schemes/central" element={<CentralSchemes />} />
            <Route path="/schemes/state" element={<StateSchemes />} />
            <Route path="/schemes/local" element={<LocalSchemes />} />
            <Route path="/schemes/pmay" element={<PMAY />} />
            <Route path="/schemes/swachh-bharat" element={<SwachhBharat />} />

            {/* Others */}
            <Route path="/tenders" element={<Tenders />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/live-sabha" element={<LiveSabhaPage />} />

            {/* Admin */}
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin/setup" element={<AdminSetup />} />
            <Route path="/admin" element={<RequireAuth><AdminLayout /></RequireAuth>}>
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="notices" element={<AdminNotices />} />
              <Route path="complaints" element={<AdminComplaints />} />
              <Route path="projects" element={<AdminProjects />} />
              <Route path="news" element={<AdminNews />} />
              <Route path="sabha" element={<AdminSabha />} />
              <Route path="routine" element={<AdminRoutine />} />
              <Route path="officials" element={<AdminOfficials />} />
              <Route path="gallery" element={<AdminGallery />} />
              <Route path="settings" element={<AdminSettings />} />
              <Route path="create-user" element={<AdminCreateUser />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        </AuthProvider>
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
