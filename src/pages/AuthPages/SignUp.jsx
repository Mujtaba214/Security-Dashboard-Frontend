import PageMeta from "../../components/common/PageMeta.js";
import AuthLayout from "./AuthPageLayout.js";
import SignUpForm from "../../components/auth/SignUpForm.jsx";

export default function SignUp() {
  return (
    <>
      <PageMeta
        title="Security Dashboard "
        description="This is React.js SignUp Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <AuthLayout>
        <SignUpForm />
      </AuthLayout>
    </>
  );
}
