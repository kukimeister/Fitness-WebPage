import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import OMeni from "./components/OMeni";
import StoDobivas from "./components/StoDobivas";
import PlanPrehrane from "./components/PlanPrehrane";
import ProgramTreninga from "./components/ProgramTreninga";
import Recenzije from "./components/Recenzije";
import Faq from "./components/Faq";
import Kontakt from "./components/Kontakt";
import Footer from "./components/Footer";

function App() {
  return (
    <AuthProvider>
      <Navbar />
      <Hero />
      <OMeni />
      <StoDobivas />
      <PlanPrehrane />
      <ProgramTreninga />
      <Recenzije />
      <Faq />
      <Kontakt />
      <Footer />
    </AuthProvider>
  );
}

export default App;
