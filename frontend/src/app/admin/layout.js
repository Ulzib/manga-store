import AdminNavBar from "../../components/admin/navigation/AdminNavBar";

export default function AdminLayout({ children }) {
  return (
    <div>
      <AdminNavBar />
      <main className=" mx-auto ">{children}</main>
    </div>
  );
}
