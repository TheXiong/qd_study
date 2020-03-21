function createrLogger(){
    return ({getState,dispatch})=>next=>action=>{
        console.log('%c老状态',"color: red; font-size: 20px",JSON.stringify(getState()));
        next(action)
        console.log('%c新状态',"color: red; font-size: 20px",JSON.stringify(getState()));
    }
}



export default createrLogger