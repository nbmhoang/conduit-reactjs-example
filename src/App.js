/*
import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import { Layout } from 'antd';
import 'antd/dist/antd.css';
import './index.css';

import { Provider } from 'react-redux'
import PropTypes from 'prop-types';

import Home from './components/Home';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Article from './components/Article/Article';

const App = ({ store }) => {

  return (
    <Provider store={store}>
      <Layout>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/signin" component={SignIn} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/article/:id" component={Article}  />
          </Switch>
        </BrowserRouter>
      </Layout>
    </Provider>
  );
};

App.propTypes = {
  store: PropTypes.object.isRequired
}

export default App;
*/
// render(<App />, document.getElementById('root'));