import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import classnames from 'classnames'

import zf from '../foundation.scss'
import styles from './Home.scss'

class Home extends Component {
  render () {
    return (
      <div>
        <h2>Hi!</h2>
        <p>This questionnaire may take 10 to 20 minutes to complete. You will listen to 5 audio recordings (each 2-3 minutes long), and rate the speaker according to 10 attributes. All fields are optional.</p>
        <br />
        <h2>Copyright Information</h2>
        <p>Audio samples are copyright <a href='https://www.dialectsarchive.com/'>International Dialects of English Archive (IDEA)</a>. <em>Comma Gets a Cure</em> is copyright 2000 Douglas N. Honorof, Jill McCullough & Barbara Somerville.</p>
        <hr />
        <br />
        <Link to='/start' className={classnames(styles.start, zf.button, zf.large)}>Start</Link>
      </div>
    )
  }
}

export default Home
