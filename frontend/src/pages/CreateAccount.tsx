import { CreateAccountForm } from '../components/Admin/CreateAccount/CreateAccountForm';
import './CreateAccount.scss';

export function CreateAccount() {
  return (
    <section className="auth-page">
      <p className="eyebrow">New Player</p>
      <h1>Create Account</h1>
      <CreateAccountForm />
    </section>
  );
}
