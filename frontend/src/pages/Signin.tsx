import { SigninForm } from '../components/Admin/Signin/SigninForm';
import './CreateAccount.scss';

export function Signin() {
  return (
    <section className="auth-page">
      <p className="eyebrow">Welcome Back</p>
      <h1>Sign in</h1>
      <SigninForm />
    </section>
  );
}
