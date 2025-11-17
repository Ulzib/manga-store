import UserNavBar from "../../components/user/UserNavBar";

export default function UserLayout({ children }) {
  return (
    <div>
      <UserNavBar />
      <main className="container mx-auto p-4">{children}</main>
    </div>
  );
}
