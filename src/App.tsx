import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "@/contexts/AppContext";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { LivePlayer } from "@/components/LivePlayer";
import { Notification } from "@/components/Notification";
import Home from "./pages/Home";
import Shows from "./pages/Shows";
import ShowDetail from "./pages/ShowDetail";
import Hosts from "./pages/Hosts";
import Events from "./pages/Events";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import Membership from "./pages/Membership";
import Donate from "./pages/Donate";
import Schedule from "./pages/Schedule";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AppProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen bg-background">
            <Navigation />
            <Notification />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shows" element={<Shows />} />
              <Route path="/shows/:id" element={<ShowDetail />} />
              <Route path="/hosts" element={<Hosts />} />
              <Route path="/events" element={<Events />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/membership" element={<Membership />} />
              <Route path="/donate" element={<Donate />} />
              <Route path="/schedule" element={<Schedule />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
            <LivePlayer />
          </div>
        </BrowserRouter>
      </AppProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
