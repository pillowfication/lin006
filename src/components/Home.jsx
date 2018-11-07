import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import classnames from 'classnames'

import zf from '../foundation.scss'
import styles from './Home.scss'

class Home extends Component {
  render () {
    return (
      <div>
        stuff about this place
        <br />
        <hr />
        <Link to='/start' className={classnames(styles.start, zf.button, zf.large)}>Start</Link>
      </div>
    )
  }
}

export default Home
