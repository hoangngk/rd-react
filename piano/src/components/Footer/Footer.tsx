import { FunctionComponent } from 'react'
import './style.css'

export const Footer: FunctionComponent = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <a href="https://izwebtech.com">IZ Web Technology</a>
      <br />
      {currentYear}
    </footer>
  )
}
