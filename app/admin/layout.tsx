import Navbar from "@/app/components/Navbar";
import Footer from "../components/Footer";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
   
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
      </div>
    
  );
}