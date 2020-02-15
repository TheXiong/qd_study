
module.exports = function(source){
    console.log(source);
    
    return `
    !function(){
        let styleElement = document.createElement("style");
        styleElement.innerText = ${source};
        let head = document.getElementsByTagName("head");
        head[0].appendChild(styleElement)
    }()
`
}