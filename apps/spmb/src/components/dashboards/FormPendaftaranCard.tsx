// components/dashboards/FormPendaftaranCard.tsx
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@bn/ui";

// Type raw dari DB — berisi code
export type FormPendaftaranRaw = {
  id: string;
  namaSiswa: string;
  lembagaCode: string;
  kelasCode: string;
  lastStep: string;
  status: "DRAFT" | "SUBMITTED" | "VERIFIED" | "REJECTED";
  lastModified: string;
};

// Type setelah mapping — berisi label siap display
export type FormPendaftaranDisplay = Omit<FormPendaftaranRaw, 'lembagaCode' | 'kelasCode'> & {
  lembaga: string;
  kelas: string;
};

type FormPendaftaranCardProps = {
  data: FormPendaftaranDisplay[];
};

export function FormPendaftaranCard({ data }: FormPendaftaranCardProps) {
  return (
    <Card className="mt-6 bg-white border-gray-100 shadow-sm">
      <CardHeader className="border-b border-gray-100 pb-3">
        <CardTitle className="text-gray-800">Form Pendaftaran</CardTitle>
      </CardHeader>

      <CardContent className="pt-4">
        {data.length > 0 ? (
          <ul className="space-y-4">
            {data.map((form) => (
              <li key={form.id}>
                <Link
                  href={`/dashboard/pendaftaran/${form.id}`}
                  className="block rounded-xl border border-gray-100 bg-gray-50 p-4 transition-all hover:bg-blue-50 hover:border-blue-200 hover:shadow-sm"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {form.namaSiswa}
                      </h3>

                      <p className="text-sm text-gray-600">{form.lembaga}</p>

                      <p className="text-xs text-gray-500 mt-1">
                        Kelas: {form.kelas}
                      </p>
                    </div>

                    <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700">
                      {form.status}
                    </span>
                  </div>

                  <div className="mt-4 border-t border-gray-200 pt-3 space-y-1">
                    <p className="text-sm text-gray-700">
                      <span className="font-medium">Langkah Terakhir:</span>{" "}
                      {form.lastStep}
                    </p>

                    <p className="text-xs text-gray-500">
                      Terakhir diubah: {form.lastModified}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-400 text-center py-4">
            Belum ada form pendaftaran.
          </p>
        )}
      </CardContent>
    </Card>
  );
}