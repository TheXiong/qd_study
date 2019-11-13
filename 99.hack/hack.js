
let keyStr = '1234567890qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM'
let currentTry = ''
let startLength = 5;
let endLength = 5

function next(length) {
    if (length > endLength) {
        return
    }
    let pointArr = new Array(length).fill(0)

    do {
        tryOnce(pointArr)
        console.log(currentTry);
    } while (nextPoint(pointArr) != null);
    next(++length);
}

function tryOnce(pointArr) {
    currentTry = ''
    for (let i = 0; i < pointArr.length; i++) {
        currentTry += keyStr[pointArr[i]]
    }
}

function nextPoint(pointArr) {
    for (let i = pointArr.length - 1; i >= 0; i--) {
        if (pointArr[i] < keyStr.length - 1) {
            if (i != pointArr.length - 1) {
                pointArr = pointArr.fill(0, i + 1)
            }
            pointArr[i] += 1
            return pointArr
        }
    }
    return null
}

next(startLength);
