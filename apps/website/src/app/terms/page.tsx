import Navbar from '@/components/new/NavbarMain';
import Footer from "@/components/new/Footer";
import TermsPolicy from "@/components/old/TermsPolicy";


export default function TermsPage() {
    return (
        <div className="flex flex-col min-h-screen text-black bg-white">
            <Navbar />
            <main className="flex-1 pt-22">
                <TermsPolicy />
            </main>
            <Footer />
        </div>
    );
}