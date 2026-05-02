import Link from "next/link";

export default function LoginHeader () {
    return (
        <header className="w-full bg-blue-600 text-white px-6 py-4 shadow flex justify-between items-center">
            <h1 className="text-xl font-bold">Baitun Na&apos;im</h1>
            <nav>
                <Link href="/" className="text-white hover:underline font-medium transition">Kembali</Link>
            </nav>
        </header>
    );
}