 import Navbar from "@/components/new/NavbarMain";
 import Footer from "@/components/new/Footer";
 import LpiContent from "@/components/old/LpiContent";
 
 
 export default function LpiPage() {
     return (
         <div className="flex flex-col min-h-screen text-black bg-white">
             <Navbar />
             <main className="flex-1 pt-22">
                 <LpiContent />
             </main>
             <Footer />
         </div>
     );
 }