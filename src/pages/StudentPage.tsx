import Footer from "@/components/Footer";
import Header from "@/components/Header";
import StudentPortal from "@/components/StudentPortal";

const StudentPage = () => (
  <div className="min-h-screen w-full overflow-x-hidden bg-[#fbf8f2]">
    <Header />
    <main>
      <StudentPortal />
    </main>
    <Footer />
  </div>
);

export default StudentPage;
