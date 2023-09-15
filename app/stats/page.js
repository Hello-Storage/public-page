import { Footer, Navbar } from "../../components";
import Statistics from "../../components/Statistics";

const Page = () => (
  <div className="bg-primary-black overflow-hidden h-screen text-gray-100">
    <Navbar />
    <Statistics />
    <Footer />
  </div>
);

export default Page;
