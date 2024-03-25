import { CreateAccountForm } from '../components/Admin/CreateAccount/CreateAccountForm';
import './CreateAccount.scss';

export function CreateAccount() {
  return (
    <div className="create-account">
      <h2>Create Account</h2> <CreateAccountForm />
    </div>
  );
}
