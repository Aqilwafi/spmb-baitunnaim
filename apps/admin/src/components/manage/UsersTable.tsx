import { 
  Table, 
  TableHead, 
  TableBody, 
  TableRow, 
  TableHeader, 
  TableCell 
} from "@bn/ui"; // Sesuaikan path import Anda

// Contoh tipe data user
interface User {
  id: string;
  email: string;
  username: string;
  // Tambahkan field lain sesuai tabel profiles Anda
}

interface UsersTableProps {
  users: User[];
}

export function UsersTable({ users }: UsersTableProps) {
  return (
    <div className="overflow-x-auto border rounded-lg">
      <Table className="text-sm">
        <TableHead className="bg-gray-50 border-b">
          <TableRow>
            <TableHeader className="p-3 text-left">Username</TableHeader>
            <TableHeader className="p-3 text-left">Email</TableHeader>
            <TableHeader className="p-3 text-left">Action</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.length > 0 ? (
            users.map((user) => (
              <TableRow key={user.id} className="border-b hover:bg-gray-50">
                <TableCell className="p-3 font-medium">{user.username}</TableCell>
                <TableCell className="p-3 text-gray-600">{user.email}</TableCell>
                <TableCell className="p-3">
                  <button className="text-blue-600 hover:underline">
                    Edit
                  </button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={3} className="p-6 text-center text-gray-500">
                No users found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}