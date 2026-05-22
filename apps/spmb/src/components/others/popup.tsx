import { useState } from "react";

export default function FormWithConfirm() {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowConfirm(true); // munculkan modal konfirmasi
  };

  const confirmSubmit = () => {
    setShowConfirm(false);
  };

  return (
    <div className="p-6">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nama"
          className="border rounded p-2"
        />
        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
        >
          Submit
        </button>
      </form>

      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-bold">Konfirmasi</h2>
            <p className="mt-2">Apakah Anda yakin data sudah benar?</p>
            <div className="flex gap-4 mt-4">
              <button
                onClick={confirmSubmit}
                className="px-4 py-2 bg-green-600 text-white rounded"
              >
                Ya, Submit
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 bg-gray-400 text-white rounded"
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
