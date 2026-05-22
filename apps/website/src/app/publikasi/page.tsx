import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PublikasiComponent from "@/components/PublikasiContent";


export default function PublikasiPage() {
    return (
        <div className="flex flex-col min-h-screen text-black bg-white">
            <Navbar />
            <main className="flex-1 pt-22">
                <PublikasiComponent />
            </main>
            <Footer />
        </div>
    );
}