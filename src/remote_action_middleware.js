/**
 * Created by josephbosire on 10/05/2016.
 */
export default socket => store => next => action => {
    if (action.meta && action.meta.remote) {
        socket.emit('action', action);
        console.log(action)
    }
    return next(action);
}