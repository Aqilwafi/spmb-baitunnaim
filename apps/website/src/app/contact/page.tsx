import Navbar from "@/components/new/NavbarMain";
import Footer from "@/components/new/Footer";
import ContactContent from "@/components/old/ContactContent";


export default function AboutPage() {
    return (
        <div className="flex flex-col min-h-screen text-black bg-white">
            <Navbar />
            <main className="flex-1 pt-22">
                <ContactContent />
            </main>
            <Footer />
        </div>
    );
}