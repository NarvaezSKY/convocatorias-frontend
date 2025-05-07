import DefaultLayout from "@/layouts/default";
import { RegisterForm } from "./components/RegisterForm";

export default function Register() {
  return (
    <DefaultLayout>
      <div className="flex items-center justify-center">
        <RegisterForm />
      </div>
    </DefaultLayout>
  );
}
