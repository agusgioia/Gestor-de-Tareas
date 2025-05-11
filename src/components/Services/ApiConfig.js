import { useState } from 'react';
import { updateApiUrl } from './services/api';

const ApiConfig = () => {
  const [url, setUrl] = useState('');

  return (
    <div style={{ padding: '10px', background: '#eee' }}>
      <input 
        placeholder="https://xxxx.ngrok.io" 
        onChange={(e) => setUrl(e.target.value)}
      />
      <button onClick={() => updateApiUrl(url)}>
        Actualizar URL API
      </button>
    </div>
  );
};
export default ApiConfig;