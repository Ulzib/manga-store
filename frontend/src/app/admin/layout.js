import AdminNavBar from "../../components/admin/AdminNavBar";

export default function AdminLayout({ children }) {
  return (
    <div>
      <AdminNavBar />
      <main className=" mx-auto ">{children}</main>
    </div>
  );
}
