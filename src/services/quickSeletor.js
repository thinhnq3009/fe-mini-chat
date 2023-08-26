function quickSelector() {
    return {
        getUser: (state) => state.user,
        getUsername: (state) => state.user.user.username
    };
}

export default quickSelector;
