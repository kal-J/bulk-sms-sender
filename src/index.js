import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { StoreProvider } from './context';

// keep window height when keyboard shows..
let initialWindowHeight;
window.onload = () => {
  let viewport = document.querySelector('meta[name=viewport]');
  viewport.setAttribute(
    'content',
    `width=device-width,
    initial-scale=1.0,
    maximum-scale=1.0,
    user-scalable=0`
  );
  initialWindowHeight = `${document.documentElement.offsetHeight} px`;
};

window.onresize = () => {
  // Reset the height in the meta viewport with the initial height of the web page

  document.documentElement.style.setProperty('overflow', 'auto');

  const metaViewport = document.querySelector('meta[name=viewport]');

  metaViewport.setAttribute(
    'content',
    `height=${initialWindowHeight}px,
    width=device-width,
    initial-scale=1.0`
  );
};

ReactDOM.render(
  <StoreProvider>
    <App />
  </StoreProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
