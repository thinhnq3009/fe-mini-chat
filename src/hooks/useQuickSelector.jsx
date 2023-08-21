import { useSelector } from "react-redux";

function useQuickSelector() {
    const state = useSelector((state) => state);

    console.log(state);

    return {
        userLoggedIn: state.user.user,
        token: state.user.token,
    };
}

export default useQuickSelector;
