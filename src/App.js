import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { login, removeToken } from "./actions/user.action";
import authenticateApi from "./apis/authenticateApi";
import DefaultLayout from "./layouts/DefaultLayout/DefaultLayout";
import logo from "./logo.svg";
import { privateRoutes, publicRoutes } from "./router/router";

function App() {
    const { authenticateToken } = authenticateApi();

    // console.log(
    //     "All State in Application",
    //     useSelector((state) => state)
    // );

    const dispatch = useDispatch();
    useEffect(() => {
        authenticateToken()
            .then(({ data }) => {
                dispatch(login(data));
            })
            .catch((err) => {
                dispatch(removeToken());
                console.error(err);
                if (window.location.pathname !== "/login") {
                    window.location.href = "/login";
                }
            });
    }, []);

    return (
        <BrowserRouter>
            <div className="App">
                <Routes>
                    {publicRoutes.map((route, index) => {
                        let LayoutComponent;

                        if (route.layout) {
                            LayoutComponent = route.layout;
                        } else if (route.layout == null) {
                            LayoutComponent = Fragment;
                        } else {
                            LayoutComponent = DefaultLayout;
                        }

                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={<LayoutComponent>{route.element}</LayoutComponent>}
                            />
                        );
                    })}

                    {privateRoutes.map((route, index) => {
                        let LayoutComponent;

                        if (route.layout) {
                            LayoutComponent = route.layout;
                        } else if (route.layout == null) {
                            LayoutComponent = Fragment;
                        } else {
                            LayoutComponent = DefaultLayout;
                        }

                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={<LayoutComponent>{route.element}</LayoutComponent>}
                            />
                        );
                    })}
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
