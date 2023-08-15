import React from 'react';
import ReactDOM from 'react-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import { store } from './store/store';

/**
 * @author 김보석, 박성준
 * @todo 로고, favicon, 페이지별 이름 변경
 */

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: true,
    },
  },
});

ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <App />
    </Provider>
  </QueryClientProvider>,
  document.getElementById('root'),
);

// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', () => {
//     navigator.serviceWorker
//       .register('./service-worker.ts', { scope: '/' })
//       .then(registration => {
//         console.log('Service Worker registered:', registration);
//       })
//       .catch(error => {
//         console.log('Service Worker registration failed:', error);
//       });
//   });
// }
// 임시lint해제
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('./service-worker.ts')
      .then(registration => {
        console.log('SW registered', registration);
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        registration.pushManager.subscribe({ userVisibleOnly: true });
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        Notification.requestPermission().then(p => {
          console.log(p);
        });
      })
      .catch(e => {
        console.log('SW registration failed: ', e);
      });
  });
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
