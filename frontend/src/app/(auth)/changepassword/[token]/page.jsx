import ResetPasswordForm from "@/components/user/resetpassword/ResetPasswordForm";

const ChangePasswordPage = async ({ params }) => {
  const { token } = await params;
  return <ResetPasswordForm token={token} />;
};

export default ChangePasswordPage;
