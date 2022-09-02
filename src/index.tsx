import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import StoreWrapper from 'store/storeWrapper';
import './sass/index.scss';
import './sass/normalize.scss';
import App from './App';

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <StoreWrapper>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StoreWrapper>
);
