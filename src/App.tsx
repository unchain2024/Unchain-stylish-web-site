import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { LanguageProvider } from "@/lib/language";
import Index from "./pages/Index";
import AboutPage from "./pages/AboutPage";
import NewsPage from "./pages/NewsPage";
import CareerPage from "./pages/CareerPage";
import ContactPage from "./pages/ContactPage";
import SolutionsPage from "./pages/SolutionsPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import TermsOfUsePage from "./pages/TermsOfUsePage";
import NotFound from "./pages/NotFound";
import ScrollToTop from "./components/ScrollToTop";

const queryClient = new QueryClient();

const AppLayout = () => (
  <LanguageProvider>
    <ScrollToTop />
    <Outlet />
  </LanguageProvider>
);

const pageRoutes = (
  <>
    <Route index element={<Index />} />
    <Route path="about" element={<AboutPage />} />
    <Route path="news" element={<NewsPage />} />
    <Route path="career" element={<CareerPage />} />
    <Route path="contact" element={<ContactPage />} />
    <Route path="solutions" element={<SolutionsPage />} />
    <Route path="privacy-policy" element={<PrivacyPolicyPage />} />
    <Route path="terms-of-use" element={<TermsOfUsePage />} />
  </>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Japanese (default) */}
          <Route element={<AppLayout />}>
            {pageRoutes}
          </Route>

          {/* English */}
          <Route path="/en" element={<AppLayout />}>
            {pageRoutes}
          </Route>

          {/* 404 */}
          <Route path="*" element={<AppLayout />}>
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
