import { Route, Routes } from 'react-router-dom';
import Login from '../../login/login';

interface LoginRouterProps {
  onLogin: (newToken: string) => void;
}

function LoginRouter({ onLogin }: LoginRouterProps) {
  return (
    <Routes>
      <Route path="/" element={<Login onLogin={onLogin} />} />
    </Routes>
  );
}

export default LoginRouter;