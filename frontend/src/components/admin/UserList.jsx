"use client";

import { useEffect, useState } from "react";
import axios from "../axios/axios";
import { Card } from "../ui/card";
import Spinner from "../Spinner";
import { ShieldIcon, UserCircle } from "lucide-react";

const UserList = () => {
  const [users, setUsers] = useState([]); //user jagsaalt
  const [loading, setLoading] = useState(true);

  //backend-s users tatah
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("users");
        setUsers(response.data.data || []);
      } catch (err) {
        console.log("Алдаа гарлаа:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  if (loading) {
    <div className="flex justify-center items-center min-h-screen">
      <Spinner />
    </div>;
  }
  return (
    <div className="flex justify-center items-center px-4 sm:px-6 lg:px-8 py-6 ">
      <div className="max-w-4xl w-full">
        <h1 className="text-3xl sm:text-3xl font-bold mb-6 ">Хэрэглэгчид</h1>
        <Card className="p-4 sm:p-6">
          <div className="space-y-4 sm:space-y-5">
            {users.map((user) => (
              <div
                key={user._id}
                className="flex items-center sm:flex-row sm:items-center  gap-4 p-4 border rounded hover:bg-gray-50"
              >
                {/* Avatar icon */}
                <div className="p-3 bg-green-300 rounded-full self-start sm:self-auto">
                  <UserCircle className="w-6 h-6 text-gray-700" />
                </div>
                {/* Хэрэглэгчийн мэдээлэл */}
                <div className="flex-1">
                  <p className="font-medium">{user.name}</p>
                  <p className="text-sm text-gray-500 sm:truncate">
                    {user.email}
                  </p>
                </div>
                {/* erh */}
                <div className="flex items-center gap-2 self-start sm:self-auto">
                  {user.role === "admin" && (
                    <ShieldIcon className="w-4 h-4 text-red-500" />
                  )}
                  {user.role === "operator" && (
                    <ShieldIcon className="w-4 h-4 text-orange-500" />
                  )}
                  {user.role === "user" && (
                    <ShieldIcon className="w-4 h-4 text-gray-500" />
                  )}

                  <span
                    className={`px-3 py-1 text-xs rounded-full ${
                      user.role === "admin"
                        ? "bg-red-100 text-red-600"
                        : user.role === "operator"
                        ? "bg-orange-100 text-orange-600"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {user.role === "admin"
                      ? "Админ"
                      : user.role === "operator"
                      ? "Оператор"
                      : "Хэрэглэгч"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default UserList;
