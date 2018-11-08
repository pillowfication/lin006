import React, { Component } from 'react'
import classnames from 'classnames'
import request from 'superagent'

import fa from '../font-awesome.scss'
import styles from './Done.scss'

class Done extends Component {
  componentDidMount () {
    if (window._cachedQuestionnaire) {
      window._cachedQuestionnaire.endTime = Date.now()
      request
        .post('http://lin.pf-n.co/api/submit')
        .send(window._cachedQuestionnaire)
        .end((err, res) => {
          if (err) {
            console.log('Error')
            console.log(err)
          } else {
            console.log(res)
          }
        })
    } else {
      console.log('No questionnaire found to submit')
    }
  }

  render () {
    return (
      <div className={styles.thankYou}>
        <h2>Thank you!</h2>
        <i className={classnames(fa.fa, fa.faCheck, fa.fa5x)} />
      </div>
    )
  }
}

export default Done
