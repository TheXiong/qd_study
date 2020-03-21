

function bindActionCreators(actions,dispatch) {
    let newAction = {}
    for (const type in actions) {
        newAction[type] = () => {
            dispatch(actions[type]())
        }
    }
    return newAction
}
export default bindActionCreators