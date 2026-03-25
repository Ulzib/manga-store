import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const LoginInputs = ({
  email,
  setEmail,
  password,
  setPassword,
  setShowForgot,
  handleGuestLogin,
}) => {
  return (
    <FieldGroup>
      <Field>
        <FieldLabel htmlFor="email">И-Мэйл</FieldLabel>
        <Input
          id="email"
          type="email"
          placeholder="@gmail.com"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          className="border border-gray-600"
          required
        />
      </Field>
      <Field>
        <div className="flex items-center">
          <FieldLabel htmlFor="password">Нууц үг</FieldLabel>
          <button
            type="button"
            onClick={() => setShowForgot(true)}
            className="ml-auto inline-block text-sm underline-offset-4 hover:underline text-blue-400"
          >
            Нууц үгээ мартсан?
          </button>
        </div>
        <Input
          id="password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          className="border border-gray-600"
          required
        />
      </Field>
      <Field>
        <Button
          type="submit"
          className="bg-linear-to-r from-indigo-500 to-purple-600 hover:opacity-90"
        >
          Нэвтрэх
        </Button>
        <Button
          variant="outline"
          type="button"
          className="bg-white text-gray-700 border border-gray-300 px-6 py-2 rounded-lg hover:bg-gray-200 shadow-sm"
          onClick={handleGuestLogin}
        >
          Зочноор нэвтрэх
        </Button>
        <FieldDescription className="text-center">
          Шинэ хэрэглэгч болох{" "}
          <Link
            href="/register"
            className="text-gray-200! transition-colors hover:text-gray-400!"
          >
            Бүртгүүлэх
          </Link>
        </FieldDescription>
      </Field>
    </FieldGroup>
  );
};

export default LoginInputs;
