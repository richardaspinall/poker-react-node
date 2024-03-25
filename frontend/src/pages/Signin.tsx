import { SigninForm } from '../components/Admin/Signin/SigninForm';
import './CreateAccount.scss';

export function Signin() {
  return (
    <div className="create-account">
      <h2>Sign in</h2> <SigninForm />
    </div>
  );
}
