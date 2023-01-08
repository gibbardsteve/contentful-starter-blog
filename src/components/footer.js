import React from 'react'

import Container from './container'
import * as styles from './footer.module.css'

const Footer = () => (
  <Container as="footer">
    <div className={styles.container}>
      Contact me on <a href="https://www.linkedin.com/in/steve-gibbard-sweng
">LinkedIn</a> &middot;{' '}
      <a href="https://twitter.com/jegglecreate">Twitter</a>
    </div>
  </Container>
)

export default Footer
