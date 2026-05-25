// src/app/page.tsx

import Link from "next/link";
import Image from "next/image";
import {Button} from "@bn/ui";


export default function HomePage() {
    return (
        <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
            <div className="flex flex-col items-center gap-4 max-w-md w-full">
                <Image
                    src="/logo_lpi.jpg"   
                    alt="Logo LPI"
                    width={120}
                    height={120}
                    priority
                    className="rounded-full -mt-10"
                  />
                <div className="flex flex-col gap-8 w-full max-w-xs">
                    <h1 className="text-2xl font-bold text-gray-900 text-center">
                    {"BAITUN NA'IM"}
                    </h1>
                </div>
                <div className="flex flex-col gap-4 w-full max-w-md">
                    <Link href="/login">
                      <Button variant="primary" className="w-full">
                        LOGIN
                      </Button>
                    </Link>
                    <Link href="/register">
                      <Button variant="secondary" className="w-full">
                        DAFTAR AKUN BARU
                      </Button>
                    </Link>
                </div>
            </div>
      </main>
    );
}
