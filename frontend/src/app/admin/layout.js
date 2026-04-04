import AdminNavBar from "../../components/admin/navigation/AdminNavBar";

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <AdminNavBar />
      <main className=" mx-auto ">{children}</main>
    </div>
  );
}
