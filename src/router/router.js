import Sidebar from "~/layouts/components/Sidebar/Sidebar";
import DefaultLayout from "~/layouts/DefaultLayout/DefaultLayout";
import { ChatPage } from "~/pages/ChatPage";
import HomePage from "~/pages/HomePage/HomePage";
import LoginPage from "~/pages/LoginPage/LoginPage";
import { RegisterPage } from "~/pages/RegisterPage";

export const publicRoutes = [
    { path: "/", element: <LoginPage />, layout: DefaultLayout},
    { path: "/login", element: <LoginPage />, layout: DefaultLayout },
    { path: "/register", element: <RegisterPage />, layout: DefaultLayout },
];

export const privateRoutes = [
    { path: "/chat", element: <ChatPage/>, role: ["USER"] },
];