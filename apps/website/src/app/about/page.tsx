import Navbar from "@/components/new/NavbarMain";
import Footer from "@/components/new/Footer";
import AboutContent from "@/components/old/AboutContent";


export default function AboutPage() {
    return (
        <div className="flex flex-col min-h-screen text-black bg-white">
            <Navbar />
            <main className="flex-1 pt-22">
                <AboutContent />
            </main>
            <Footer />
        </div>
    );
}