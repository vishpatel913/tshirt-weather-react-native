import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import Main from './components/Main';

class App extends Component {
  
  render() {
    const store = createStore(reducers, applyMiddleware(thunk));
    return (
      <Provider store={store}>
        <Main />
      </Provider>
    );
  }
}

export default App;
