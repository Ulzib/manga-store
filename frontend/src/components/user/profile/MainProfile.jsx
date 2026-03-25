"use client";
import { useEffect, useState } from "react";
import axios from "../../axios/Axios";

import ProfileTabs from "./ProfileTabs";
import ProfileInfoForm from "./ProfileInfoForm";
import ProfilePasswordForm from "./ProfilePasswordForm";
import toast from "react-hot-toast";
import Spinner from "@/components/Spinner";

const MainProfile = () => {
  const [activeTab, setActiveTab] = useState("info");
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/users/profile");
      const user = response.data.data;
      setProfileData({
        name: user.name,
        email: user.email,
      });
    } catch (error) {
      toast.error("Профайл татахад алдаа гарлаа!");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.put("/users/profile", profileData);
      if (res.data.data) {
        localStorage.setItem("user", JSON.stringify(res.data.data));
        toast.success("Профайл амжилттай шинэчлэгдлээ!");
      }
    } catch (err) {
      toast.error(err.res?.data?.message || "Алдаа гарлаа!");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("Шинэ нууц үг таарахгүй байна!");
      return;
    }
    if (passwordData.newPassword.length < 6) {
      toast.error("Нууц үг хамгийн багадаа 6 тэмдэгт байх ёстой!");
      return;
    }
    setLoading(true);

    try {
      const res = await axios.put("/users/password", {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });

      if (res.data.success) {
        toast.success("Нууц үг амжилттай солигдлоо!");
        setPasswordData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      }
    } catch (err) {
      toast.error(err.res?.data?.message || "Алдаа гарлаа!");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="container pt-22 text-white">
      <h1 className="text-3xl font-bold mb-8">Миний профайл</h1>

      <ProfileTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      {activeTab === "info" && (
        <ProfileInfoForm
          profileData={profileData}
          setProfileData={setProfileData}
          loading={loading}
          onSubmit={handleUpdateProfile}
        />
      )}

      {activeTab === "password" && (
        <ProfilePasswordForm
          passwordData={passwordData}
          setPasswordData={setPasswordData}
          loading={loading}
          onSubmit={handleUpdatePassword}
        />
      )}
    </div>
  );
};
export default MainProfile;
