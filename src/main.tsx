import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import store from './Store';
import Routers from './Router.tsx';
import { BrowserRouter } from 'react-router';



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routers/>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
