export function add () {
    return {type:'ADD'}
}

export function minus () {
    return {type:'MINUS'}
}

export function asyncMinus () {
    return (dispatch,getState)=>{
        setTimeout(()=>{
            dispatch(minus())
        },1000)
    }
}

export function asyncAdd () {
    return (dispatch,getState)=>{
        setTimeout(()=>{
            dispatch(add())
        },1000)
    }
}