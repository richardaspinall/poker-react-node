import { ChangeEvent, FocusEvent, FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { socket } from '../../../Socket';
import apiCall from '../../../fetch/apiCall';
import { setUsername } from '../../../store/usernameSlice';
import '../CreateAccount/CreateAccountForm.scss';

interface FormData {
  [key: string]: string;
  username: string;
  password: string;
}

export function SigninForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    username: '',
    password: '',
  });

  const [touched, setTouched] = useState({
    username: false,
    password: false,
  });

  const isValid = (name: string) => {
    return formData[name].trim() !== '';
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setTouched((prevTouched) => ({
      ...prevTouched,
      [name]: true,
    }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const payload = { username: formData.username, password: formData.password };

    const result = await apiCall.post('users.signin', payload);
    console.log(payload.username);
    if (result.ok) {
      console.log(result.payload);
      console.log('success');
      socket.disconnect();
      socket.connect();
      dispatch(setUsername(payload.username));
      navigate('/play');
    } else {
      console.log('error');
      console.log(result.error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          onBlur={handleBlur}
          className={!isValid('username') && touched.username ? 'invalid' : ''}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          onBlur={handleBlur}
          className={!isValid('password') && touched.password ? 'invalid' : ''}
        />
      </div>
      <button type="submit" disabled={isLoading}>
        Sign in
      </button>
    </form>
  );
}
