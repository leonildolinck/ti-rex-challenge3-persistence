import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./styles/index.css";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { ClerkProvider } from "@clerk/clerk-react";




ReactDOM.createRoot(document.getElementById("root")!).render(
  /*<React.StrictMode>*/
    <ClerkProvider publishableKey="pk_test_bGl2ZS1ib3hlci04Ni5jbGVyay5hY2NvdW50cy5kZXYk">
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </ClerkProvider>
  /*</React.StrictMode>*/
);
