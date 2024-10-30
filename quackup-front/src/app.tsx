import Routing from 'pages';
import { Provider } from 'react-redux';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { SDKProvider } from '@telegram-apps/sdk-react';

import { store } from 'store';
import eruda from 'eruda';

if (process.env.REACT_APP_ENV !== 'production') {
  eruda.init();
}

const App = () => {
  return (
    <BrowserRouter>
      <SDKProvider>
        <Toaster
          toastOptions={{
            duration: 2000,
          }}
        />
        <Provider store={store}>
          <Routing />
        </Provider>
      </SDKProvider>
    </BrowserRouter>
  );
};

export default App;
