import StudentNavbar from "@/app/components/StudentNavbar";
import Footer from "../components/Footer";

export default function StudentLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <StudentNavbar />
      {children}
      <Footer />
    </>
  );
}