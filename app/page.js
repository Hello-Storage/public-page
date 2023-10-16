import { Footer, Navbar } from "../components";
import { Hero } from "../sections";

const Page = () => (
  <div className="bg-slate-950 relative overflow-hidden h-screen text-gray-100">
    <Navbar />
    <Hero />
    <Footer />
  </div>
);

export default Page;
