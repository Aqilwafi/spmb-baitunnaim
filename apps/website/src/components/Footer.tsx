export default function Footer() {
  return (
    <footer className="bg-teal-800 text-gray-200 py-8">
      <div className="container mx-auto px-4 text-center">
        <p>© {new Date().getFullYear()} Baitunnaim. All rights reserved.</p>
        <div className="mt-4 space-x-4">
          <a href="/about" className="hover:text-white">TENTANG KAMI</a>
          <a href="/terms" className="hover:text-white">TERMS & POLICY</a>
        </div>
      </div>
    </footer>
  );
}
