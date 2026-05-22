import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TermsPolicy from "@/components/TermsPolicy";


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