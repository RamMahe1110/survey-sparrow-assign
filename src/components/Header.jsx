import React from 'react'
import { Link } from 'react-router-dom'

class Header extends React.Component {
  state = {
    smMenuActivation: false,
  }

  setSmallMenuActivation = () => {
    if (this.state.smMenuActivation) {
      this.setState({
        smMenuActivation: false,
      })
    } else {
      this.setState({
        smMenuActivation: true,
      })
    }
  }

  render() {
    return (
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
            <div
              className="header__main-ham-menu-cont"
              onClick={this.setSmallMenuActivation}
            >
              <img
                src={require('../assets/menu.svg').default}
                alt="hamburger menu"
                className="header__main-ham-menu"
              />
            </div>
          </div>
        </div>
        <div
          className={`header__sm-menu ${
            this.state.smMenuActivation ? ' header__sm-menu--active' : ''
          }`}
        >
          <div className="header__sm-menu-content">
            <ul className="header__sm-menu-links">
              <li className="header__sm-menu-link">Products</li>

              <li className="header__sm-menu-link">Features</li>

              <li className="header__sm-menu-link">Use Cases</li>

              <li className="header__sm-menu-link">Pricing</li>

              <li className="header__sm-menu-link">Login</li>
            </ul>
          </div>
        </div>
      </header>
    )
  }
}

export default Header
