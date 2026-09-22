// components/dashboards/FormPendaftaranCard.tsx

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@bn/ui";
import { FormCardsData } from "@/types/form.types";
import { formatDateTimeId } from "@bn/utils";

export function FormPendaftaranCard({ data }: { data: FormCardsData[] }) {
  return (
    <Card className="mt-6 bg-white border-gray-100 shadow-sm">
      <CardHeader className="border-b border-gray-100 pb-3">
        <CardTitle className="text-gray-800">Form Pendaftaran</CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <ul className="space-y-4">
          {data.map((form) => (
            <li key={form.id}>
              <Link
                href={`/dashboard/pendaftaran/${form.id}`}
                className="block rounded-xl border border-gray-100 bg-gray-50 p-4 transition-all hover:bg-blue-50 hover:border-blue-200 hover:shadow-sm"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {form.namaLengkap}
                    </h3>
                    <p className="text-sm text-gray-600">{form.lembagaLabel}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {form.kelasLabel}
                    </p>
                  </div>

                  {/* Penataan status terpisah yang rapi & terstruktur */}
                  <div className="flex flex-wrap items-center gap-2 shrink-0">
                    <span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700 border border-blue-200/60">
                      Registrasi: {form.registrationStatus}
                    </span>
                    <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700 border border-emerald-200/60">
                      Penerimaan: {form.admissionStatus}
                    </span>
                  </div>
                </div>

                <div className="mt-4 border-t border-gray-200 pt-3 space-y-1">
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">Langkah Terakhir:</span>{" "}
                    {form.stepLabel}
                  </p>
                  <p className="text-xs text-gray-500">
                    Terakhir diubah: {formatDateTimeId(form.updatedAt)}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}