function reducer(
    state = {
        count: 0
    },
    action
) {
    switch (action.type) {
        case "ADD":
            return {
                count: ++state.count
            };
        case "MINUS":
            return {
                count: --state.count
            };
        default:
            return state;
            break;
    }
}

export default reducer;
