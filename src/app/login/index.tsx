import DefaultLayout from "@/layouts/default";
import { LoginForm } from "./components/LoginForm";

export default function Login() {
  return (
    <DefaultLayout>
      <div className="flex items-center justify-center">
        <LoginForm />
      </div>
    </DefaultLayout>
  );
}
