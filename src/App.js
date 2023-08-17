import { Fragment } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DefaultLayout from "./layouts/DefaultLayout/DefaultLayout";
import logo from "./logo.svg";
import { privateRoutes, publicRoutes } from "./router/router";

function App() {
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
