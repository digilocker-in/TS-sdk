import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDigilocker } from '../context';

const LoginPage = () => {
  const [loginUrl, setLoginUrl] = useState('');
  const digilockerInstance: any = useDigilocker();

  useEffect(() => {
    // @ts-ignore
    const loginUrl = digilockerInstance.generateLoginUrl();
    setLoginUrl(loginUrl);
  }, []);

  return (
    <div>
      <div className="card">
        <h3>Login with Digilocker</h3>
        <Link to={loginUrl} className="login-button">
          Login
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
