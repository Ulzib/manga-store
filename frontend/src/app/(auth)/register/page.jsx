import RegisterForm from "@/components/user/register/RegisterForm";

const RegisterPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen py-10 md:py-0">
      <RegisterForm className="w-full max-w-md absolute" />
    </div>
  );
};
export default RegisterPage;
