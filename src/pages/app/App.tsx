import { BrowserRouter as Router } from 'react-router-dom';
import DocListRouter from './router/doc_list_pac-router';
import MediaRouter from './router/media-router';
import LoginRouter from './router/login-router';
import { useState } from 'react';


function App() {
  const [appToken, setAppToken] = useState<string | null>(null);

  const handleAppLogin = (newToken: string) => {
    console.log('Nuevo token en App:', newToken);
    setAppToken(newToken);
  };

  return (
    <Router>
      <DocListRouter appToken={appToken} />
      <MediaRouter appToken={appToken} />
      <LoginRouter onLogin={handleAppLogin} />
    </Router>
  );
}

export default App;