import { SignIn } from "@clerk/clerk-react";
import "./Auth.css";

export default function Login() {
  return (
    <div className="auth-page">
      <SignIn />
    </div>
  );
}