import { CreateAccountForm } from '../components/CreateAccount/CreateAccountForm';
import './CreateAccount.css';

export function CreateAccount() {
  return (
    <div className="create-account">
      <h2>Create Account</h2> <CreateAccountForm />
    </div>
  );
}
