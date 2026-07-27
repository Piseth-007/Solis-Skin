import AuthLayout from "../components/auth/AuthLayout";
import RegisterForm from "../components/auth/RegisterForm";

export default function Register() {
  return (
    <AuthLayout
      title="Create Account"
      subtitle="Join Solis Skin and enjoy a better skincare shopping experience."
    >
      <RegisterForm />
    </AuthLayout>
  );
}
