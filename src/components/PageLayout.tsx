import TopHeader from "@/components/TopHeader";
import MainNav from "@/components/MainNav";
import Footer from "@/components/Footer";

const PageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-background font-devanagari">
      <TopHeader />
      <MainNav />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default PageLayout;
