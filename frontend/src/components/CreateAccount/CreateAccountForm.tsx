import { useState, ChangeEvent, FormEvent, FocusEvent } from 'react';
import { socket } from '../../Socket';

import './CreateAccountForm.scss';
interface FormData {
  [key: string]: string;
  username: string;
  password: string;
}

export function CreateAccountForm() {
  // Form state
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

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setIsLoading(true);

    // This is how you emit an event and get a response back via the server callback "response".
    socket.timeout(5000).emit('hello_from_client', formData.username, (err: Error, statusCode: number) => {
      if (err) {
        console.log(err);
      } else {
        console.log(statusCode);
      }
      setIsLoading(false);
    });
  }

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
          required
        />
      </div>
      <button type="submit" disabled={isLoading}>
        Create Account
      </button>
    </form>
  );
}
