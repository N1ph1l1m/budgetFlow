import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import store from './store/index.tsx';
import Routers from './routers.tsx';
import { Suspense } from 'react';
import "./18n.js"


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
    <Suspense fallback={<div>Loading..</div>}>
           <Routers/>
    </Suspense>
    </Provider>
  </StrictMode>
);
