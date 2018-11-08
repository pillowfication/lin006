import React, { Component } from 'react'
import classnames from 'classnames'

import japan from '../assets/japan10.mp3'
import malaysia from '../assets/malaysia2.mp3'
import shanghai from '../assets/shanghai2.mp3'
import southKorea from '../assets/south-korea3.mp3'
import vietnam from '../assets/vietnam3.mp3'

import zf from '../foundation.scss'
import fa from '../font-awesome.scss'
import styles from './Questionnaire.scss'

const files = [
  { key: 'japan', src: japan },
  { key: 'malaysia', src: malaysia },
  { key: 'shanghai', src: shanghai },
  { key: 'south-korea', src: southKorea },
  { key: 'vietnam', src: vietnam }
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
  { key: 'leader-like', desc: 'Looks being able to be a leader' },
  { key: 'hard-working', desc: 'Looks hard-working' },
  { key: 'clarity', desc: 'Is easy to understand' }
]

const surveyeeQuestions = [
  { key: 'born', desc: 'What state/country where you born in?' },
  { key: 'residence', desc: 'Where is your primary place of residence?' },
  { key: 'primary-language', desc: 'Which language(s) do you speak usually?' },
  { key: 'parental-language', desc: 'Which language(s) do your parents usually speak to you?' }
]

class Questionnaire extends Component {
  constructor (propTypes) {
    super(propTypes)

    if (window._cachedQuestionnaire) {
      this.indexMap = window._cachedQuestionnaire.indexMap
      this.state = window._cachedQuestionnaire.state
    } else {
      // In place of Flux-like architecture
      window._cachedQuestionnaire = {}

      window._cachedQuestionnaire.startTime = Date.now()

      window._cachedQuestionnaire.indexMap = (function shuffle (array) {
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

      window._cachedQuestionnaire.state = {
        fileIndex: 0
      }

      files.forEach(file => {
        window._cachedQuestionnaire.state[file.key] = {}
        attributes.forEach(attr => {
          window._cachedQuestionnaire.state[file.key][attr.key] = -1
          window._cachedQuestionnaire.state[file.key].comments = ''
        })
      })

      window._cachedQuestionnaire.state.surveyee = {}
      surveyeeQuestions.forEach(question => {
        window._cachedQuestionnaire.state.surveyee[question.key] = ''
      })

      this.startTime = window._cachedQuestionnaire.startTime
      this.indexMap = window._cachedQuestionnaire.indexMap
      this.state = window._cachedQuestionnaire.state
    }

    // this.onClickRating = this.onClickRating.bind(this)
    this.onInputComment = this.onInputComment.bind(this)
    // this.onInputSurveyeeQuestion = this.onInputSurveyeeQuestion.bind(this)
    this.onClickPrevious = this.onClickPrevious.bind(this)
    this.onClickNext = this.onClickNext.bind(this)
  }

  componentWillUnmount () {
    window._cachedQuestionnaire = {
      startTime: this.startTime,
      indexMap: this.indexMap,
      state: this.state
    }
  }

  onClickRating (attr, rating) {
    const fileKey = files[this.indexMap[this.state.fileIndex]].key
    this.state[fileKey][attr] = rating === this.state[fileKey][attr] ? -1 : rating
    this.setState({ [fileKey]: this.state[fileKey] })
  }

  onInputComment (event) {
    const fileKey = files[this.indexMap[this.state.fileIndex]].key
    this.state[fileKey].comments = event.target.value
    this.setState({ [fileKey]: this.state[fileKey] })
  }

  onInputSurveyeeQuestion (key, event) {
    this.state.surveyee[key] = event.target.value
    this.setState({ surveyee: this.state.surveyee })
  }

  onClickPrevious () {
    if (this.state.fileIndex > 0) {
      this.setState({ fileIndex: this.state.fileIndex - 1 })
    }
  }

  onClickNext () {
    if (this.state.fileIndex < files.length) {
      this.setState({ fileIndex: this.state.fileIndex + 1 })
      window.scrollTo(0, 0)
    }
  }

  render () {
    console.log(this.state)

    if (this.state.fileIndex < files.length) {
      const file = files[this.indexMap[this.state.fileIndex]]
      const fileState = this.state[file.key]

      return (
        <div>
          <h2>Audio {this.state.fileIndex + 1}</h2>
          <audio controls className={styles.audio} key={this.state.fileIndex}>
            <source src={file.src} type='audio/mpeg' />
          </audio>
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
                        onClick={this.onClickRating.bind(this, attr.key, rating)}
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
          <p>Other comments:</p>
          <textarea rows={5}
            value={fileState.comments}
            onChange={this.onInputComment}
          />
          <hr />
          <div className={classnames(styles.buttons, zf.row)}>
            <div className={classnames(zf.small6, zf.columns)}>
              <button
                className={classnames(zf.button, zf.large, this.state.fileIndex === 0 && zf.disabled)}
                onClick={this.onClickPrevious}
              >
                Previous
              </button>
            </div>
            <div className={classnames(zf.small6, zf.columns)}>
              <button
                className={classnames(zf.button, zf.large)}
                onClick={this.onClickNext}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div>
          <h2>About You</h2>
          <br />
          {surveyeeQuestions.map(question =>
            <div key={question.key}>
              <p>{question.desc}</p>
              <input type='text' value={this.state.surveyee[question.key]} onChange={this.onInputSurveyeeQuestion.bind(this, question.key)} />
            </div>
          )}
          <hr />
          <div className={classnames(styles.buttons, zf.row)}>
            <div className={classnames(zf.small6, zf.columns)}>
              <button
                className={classnames(zf.button, zf.large, this.state.fileIndex === 0 && zf.disabled)}
                onClick={this.onClickPrevious}
              >
                Previous
              </button>
            </div>
            <div className={classnames(zf.small6, zf.columns)}>
              <button
                className={classnames(zf.button, zf.large)}
                onClick={this.onClickNext}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )
    }
  }
}

export default Questionnaire
