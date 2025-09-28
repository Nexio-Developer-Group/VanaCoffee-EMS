import Hero from "./components/Hero";
import MenuSection from "./components/MenuSection";
import About from "./components/About";
import Location from "./components/Location";
import Footer from "./components/Footer";
import { Book } from 'lucide-react'
import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <div>
             <div className="fixed bottom-4 right-4 z-50">
                <Link to="/menu" className="">
                    <span className='flex items-center gap-2 text-sm font-medium bg-black p-2 px-4 rounded-4xl text-primary-deep dark:text-white'>
                        <Book className="w-4 h-4 text-secondary" />
                        <span className='text-secondary'>Menu</span>
                    </span>
                </Link>
            </div>
            <Hero />
            <MenuSection />
            <About />
            <Location />
            <Footer />
        </div>
    );
};

export default Home;