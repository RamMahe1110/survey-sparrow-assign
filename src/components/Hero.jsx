import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Loader from 'react-loader-spinner'

class Hero extends React.Component {
  state = {
    chatActivated: false,
    messageInput: '',
    allMessages: [
      {
        type: 'support',
        msg: 'Hello, How can I help you? Let me know.',
      },
    ],
    supportLoader: false,
    chatPopup: false,
  }

  scrollToBottomOfChat = () => {
    let mainChat = document.getElementsByClassName(
      'chat-container__convo-main'
    )[0]
    mainChat.scrollTop = mainChat.scrollHeight
  }

  getSupportMessage = () => {
    const allMessages = this.state.allMessages

    allMessages.push({
      type: 'support',
      msg: null,
    })

    this.setState(
      {
        supportLoader: true,
        allMessages,
      },
      () => {
        this.scrollToBottomOfChat()
      }
    )

    axios
      .get('https://api.adviceslip.com/advice')
      .then((res) => {
        allMessages.pop()

        allMessages.push({
          type: 'support',
          msg: res.data.slip.advice,
        })

        this.setState(
          {
            allMessages,
            supportLoader: false,
          },
          () => {
            this.scrollToBottomOfChat()
          }
        )
      })
      .catch((err) => {
        this.setState({
          supportLoader: false,
        })
      })
  }

  onFormSubmit = (e) => {
    e.preventDefault()

    const allMessages = this.state.allMessages

    if (this.state.messageInput.length > 0) {
      allMessages.push({
        type: 'user',
        msg: this.state.messageInput,
      })

      this.setState(
        {
          allMessages,
          messageInput: '',
        },
        () => {
          this.getSupportMessage()
          this.scrollToBottomOfChat()
        }
      )
    }
  }

  chatActivation = () => {
    this.setState({ chatActivated: true })
  }

  onChatToggle = () => {
    if (this.state.chatPopup) {
      this.setState({ chatPopup: false })
    } else {
      this.setState({ chatPopup: true })
    }
  }

  render() {
    return (
      <section className="hero">
        <header className="header">
          <div className="header__content">
            <div className="header__logo-container">
              <span className="header__logo-text">Maxeon</span>
            </div>
            <div className="header__main">
              <ul className="header__links">
                <li className="header__link-wrapper">
                  <Link to="/" className="header__link">
                    Products
                  </Link>
                </li>
                <li className="header__link-wrapper">
                  <Link to="/" className="header__link">
                    Features
                  </Link>
                </li>
                <li className="header__link-wrapper">
                  <Link to="/" className="header__link">
                    Use Cases
                  </Link>
                </li>
                <li className="header__link-wrapper">
                  <Link to="/" className="header__link">
                    Pricing
                  </Link>
                </li>
                <li className="header__link-wrapper">
                  <Link to="/" className="header__link header__link--hl">
                    Login
                  </Link>
                </li>
              </ul>
              {/* <div className="header__main-ham-menu-cont">
                <img
                  src="./assets/menu.svg"
                  alt="hamburger menu"
                  className="header__main-ham-menu"
                />
              </div> */}
            </div>
          </div>
          {/* <div className="header__sm-menu">
            <div className="header__sm-menu-content">
              <ul className="header__sm-menu-links">
                <li className="header__sm-menu-link">Home</li>

                <li className="header__sm-menu-link">About</li>

                <li className="header__sm-menu-link">Projects</li>

                <li className="header__sm-menu-link">Blog</li>
              </ul>
            </div>
          </div> */}
        </header>
        <section className="hero">
          <div className="hero__content">
            <h1 className="hero__heading-primary">
              <span className="hero__heading-primary-text">Where</span>
              <span className="hero__heading-primary-text">words</span>
              <span className="hero__heading-primary-text">fail,</span>
              <span className="hero__heading-primary-text">Music</span>
              <span className="hero__heading-primary-text">speaks.</span>
            </h1>
          </div>
          <div onClick={this.onChatToggle} className="chat-element">
            <div className="chat-element__icon-cont">
              {this.state.chatPopup ? (
                <span class="material-icons chat-element__close-icon">
                  close
                </span>
              ) : (
                <img
                  src={require('../assets/Sparrow Bird.png').default}
                  alt="Icon"
                  className="chat-element__icon"
                />
              )}
            </div>
          </div>
          {this.state.chatPopup ? (
            <div className="chat-container">
              <div className="chat-container__content">
                <div className="chat-container__greetings">
                  <h3 className="chat-container__greetings-title">Hi There</h3>
                  <p className="chat-container__greetings-msg">
                    The team typically replies in a few minutes
                  </p>
                </div>
              </div>
              <div className="chat-container__main">
                {!this.state.chatActivated ? (
                  <div className="chat-container__start">
                    <h3 className="chat-container__start-title">
                      Start a Conversation
                    </h3>
                    <p className="chat-container__start-msg">
                      The team typically replies in a few minutes
                    </p>
                    <button
                      onClick={this.chatActivation}
                      className="chat-container__start-btn"
                    >
                      <span className="chat-container__start-btn-text">
                        New Conversation
                      </span>

                      <span className="material-icons chat-container__start-btn-icon">
                        send
                      </span>
                    </button>
                  </div>
                ) : (
                  <div className="chat-container__convo">
                    <div className="chat-container__convo-main">
                      {this.state.allMessages.map((msgItem, idx) => {
                        if (msgItem.type === 'user') {
                          return (
                            <div
                              key={idx}
                              className="chat-container__convo-main-msg-cont"
                            >
                              <div className="chat-container__convo-main-msg chat-container__convo-main-msg--user">
                                <div className="chat-container__convo-main-msg-text">
                                  {msgItem.msg}
                                </div>
                              </div>
                            </div>
                          )
                        } else {
                          return (
                            <div
                              key={idx}
                              className="chat-container__convo-main-msg-cont"
                            >
                              <div className="chat-container__convo-main-msg chat-container__convo-main-msg--support">
                                <div className="chat-container__convo-main-msg-support-img-cont">
                                  <img
                                    src="https://d33wubrfki0l68.cloudfront.net/f4f396d63bd5e4abc40e7473d10f6537ca7effce/2db05/assets/client-4.jpg"
                                    alt="Support"
                                    className="chat-container__convo-main-msg-support-img"
                                  />
                                </div>
                                {msgItem.msg === null ? (
                                  <Loader
                                    type="ThreeDots"
                                    color="#AFBAC9"
                                    height={25}
                                    width={25}
                                  />
                                ) : (
                                  <div className="chat-container__convo-main-msg-text chat-container__convo-main-msg-text--support">
                                    {msgItem.msg}
                                  </div>
                                )}
                              </div>
                            </div>
                          )
                        }
                      })}
                    </div>
                    <div className="chat-container__convo-branding"></div>
                    <form
                      onSubmit={this.onFormSubmit}
                      className="chat-container__convo-form"
                    >
                      <input
                        placeholder="Write a reply..."
                        type="text"
                        className="chat-container__convo-form-input"
                        value={this.state.messageInput}
                        onChange={(e) => {
                          this.setState({
                            messageInput: e.target.value,
                          })
                        }}
                      />
                      <div onClick={this.onFormSubmit} className="chat-container__convo-form-submit">
                        <span className="material-icons chat-container__convo-form-submit-icon">
                          send
                        </span>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            </div>
          ) : null}
        </section>
      </section>
    )
  }
}

export default Hero
