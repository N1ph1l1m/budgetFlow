import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import store from './store/index.tsx';
import Routers from './routers.tsx';




createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
        <Routers/>
    </Provider>
  </StrictMode>
);
