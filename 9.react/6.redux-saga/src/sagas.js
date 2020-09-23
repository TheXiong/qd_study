import { delay } from 'redux-saga/effects'
import { put, takeEvery } from 'redux-saga/effects'

/*takeEvery=>负责监听  put=>派发动作   all=>防止阻塞，类似promise.all，统一监听 call=>告诉saga，执行delay，并传入1000作为参数
* saga分为三类 1、rootsaga 2、监听saga 3、worker干活的saga
*
* */

function* watchAddAsync() {
    yield takeEvery('ADD_ASYNC', addAsync)
}

function* addAsync() {
    yield delay(1000)
    yield put({type: 'ADD'})
}

export function* rootSaga() {
    yield watchAddAsync()
}