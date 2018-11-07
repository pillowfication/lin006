import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import classnames from 'classnames'

import Home from './components/Home.jsx'
import Questionnaire from './components/Questionnaire.jsx'

import zf from './foundation.scss'
import styles from './App.scss'

class App extends Component {
  render () {
    return (
      <Router>
        <div className={classnames(styles.app, zf.row)}>
          <h1>Questionnaire</h1>
          <hr />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/start' component={Questionnaire} />
            <Route render={() => <Redirect to='/' />} />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App
