import Hero from "./components/Hero";
import MenuSection from "./components/MenuSection";
import About from "./components/About";
import Location from "./components/Location";
import Footer from "./components/Footer";

const Home = () => {
    return (
        <div>
            <Hero />
            <MenuSection />
            <About />
            <Location />
            <Footer />
        </div>
    );
};

export default Home;