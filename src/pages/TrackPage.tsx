import TopHeader from "@/components/TopHeader";
import MainNav from "@/components/MainNav";
import TrackApplication from "@/components/TrackApplication";
import Footer from "@/components/Footer";

const TrackPage = () => (
  <div className="min-h-screen bg-background font-devanagari">
    <TopHeader />
    <MainNav />
    <TrackApplication />
    <Footer />
  </div>
);

export default TrackPage;
