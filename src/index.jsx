import React from 'react';
import ReactDOM from 'react-dom';
import {VotingContainer} from './components/Voting';
import {ResultsContainer} from './components/Results';
import {Router, Route, hashHistory} from 'react-router';
import App from './components/App';
import {createStore, applyMiddleware} from 'redux';
import remoteActionMiddleware from './remote_action_middleware';
import reducer from './reducer';
import {Provider} from 'react-redux';
import io from 'socket.io-client';
import {setState} from './action_creators';

const socket = io(`${location.protocol}//${location.hostname}:8090`);
socket.on('state', state =>
        store.dispatch(setState(state))
);
const createStoreWithMiddleware = applyMiddleware(
    remoteActionMiddleware(socket)
)(createStore);
const store = createStoreWithMiddleware(reducer);
const routes = <Route component={App}>
    <Route path="/results" component={ResultsContainer} />
    <Route path="/" component={VotingContainer} />
</Route>;
ReactDOM.render(
    <Provider store={store}>
        <Router history={hashHistory}>{routes}</Router>
    </Provider>,
    document.getElementById('app')
);

