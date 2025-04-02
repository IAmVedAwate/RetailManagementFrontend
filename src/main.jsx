import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/Store.jsx';
import { BillProvider } from './context/BillContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <BillProvider>
    <Provider store={store}>
      <App />
    </Provider>
    </BillProvider>
    </BrowserRouter>
  </StrictMode>,
)
