import React, { Component } from 'react'
import classnames from 'classnames'

import japan10 from '../assets/japan10.mp3'

import zf from '../foundation.scss'
import fa from '../font-awesome.scss'
import styles from './Questionnaire.scss'

const files = [
  { key: 'japan', src: japan10 }
]

const attributes = [
  { key: 'intelligent', desc: 'Looks intelligent' },
  { key: 'friendly', desc: 'Looks friendly' },
  { key: 'educated', desc: 'Looks educated' },
  { key: 'attractive', desc: 'Looks physically attractive' },
  { key: 'trustworthy', desc: 'Looks being worthy of trust' },
  { key: 'humorous', desc: 'Looks having a sense of humor' },
  { key: 'self-confident', desc: 'Looks having self-confidence' },
  { key: 'generous', desc: 'Looks generous' },
  { key: 'hard-working', desc: 'Looks hard-working' },
  { key: 'faithful', desc: 'Looks faithful' },
  { key: 'clarity', desc: 'Was easy to understand' }
]

const indexMap = (function shuffle (array) {
  let m = array.length
  while (m) {
    let i = 0 | (Math.random() * m--)
    let t = array[m]
    array[m] = array[i]
    array[i] = t
  }
  return array
}
)([ ...Array(files.length) ].map((_, i) => i))

class Questionnaire extends Component {
  constructor (propTypes) {
    super(propTypes)

    this.state = {
      fileIndex: 0
    }

    files.forEach(file => {
      this.state[file.key] = {}
      attributes.forEach(attr => {
        this.state[file.key][attr.key] = -1
        this.state[file.key].work = ''
        this.state[file.key].comments = ''
      })
    })
  }

  componentDidMount () {
    this.startTime = Date.now()
  }

  render () {
    const file = files[indexMap[this.state.fileIndex]]
    const fileState = this.state[file.key]

    return (
      <div>
        <h2>Audio {this.state.fileIndex + 1}</h2>
        {indexMap.map((mapped, index) =>
          <audio controls key={mapped}
            className={styles.audio}
            style={{ display: index === this.state.fileIndex ? 'block' : 'none' }}
          >
            <source src={file.src} type='audio/mpeg' />
          </audio>
        )}
        <hr />
        <table><tbody>
          {attributes.map(attr =>
            <tr key={attr.key}>
              <td><div className={zf.row}>
                <div className={classnames(zf.small5, zf.columns)}>
                  {attr.desc}
                </div>
                <div className={classnames(styles.ratings, zf.small7, zf.columns)}>
                  {[ 1, 2, 3, 4, 5, 6 ].map(rating =>
                    <i key={rating}
                      className={classnames(fa.fa, fa.faFw, fa.faLg, fileState[attr.key] === rating && styles.selected)}
                    >
                      {rating}
                    </i>
                  )}
                </div>
              </div></td>
            </tr>
          )}
        </tbody></table>
        <hr />
        <p>What kind of work do you think this person is carrying out?</p>
        <input type='text' />
        <p>Other comments:</p>
        <textarea rows={5} />
        <hr />
      </div>
    )
  }
}

export default Questionnaire
