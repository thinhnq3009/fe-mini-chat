import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {} from "react-router-dom";
import GlobalStyle from "./components/global/GlobalStyle/GlobalStyle";
import { Provider } from "react-redux";
import store from "./store";
import { NotificationContainer } from "./components/global/NotificationContainer";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Provider store={store}>
        {/* <React.StrictMode> */}
            <GlobalStyle>
                <App />
                <NotificationContainer/>
            </GlobalStyle>
        {/* </React.StrictMode> */}
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
