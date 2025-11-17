import AdminNavBar from "../../components/admin/AdminNavBar";

export default function AdminLayout({ children }) {
  return (
    <div>
      <AdminNavBar />
      <main className="container mx-auto p-4">{children}</main>
    </div>
  );
}
