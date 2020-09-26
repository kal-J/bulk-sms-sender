import React from 'react';
import './footer.scss';

const Footer = () => {
  return (
    <section className="footer_section">

      <div className="content">
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <span>|</span>
          <li>
            <a href="/github">Github</a>
          </li>
          <span>|</span>
          <li>
            <a href="/twitter">Twitter</a>
          </li>
          <span>|</span>
          <li>
            <a href="/twitter">Blog</a>
          </li>
        </ul>
      </div>

      <div className="content">
        <div className="playstore">
          <img src="images/playstore.png" alt="playstore" />
        </div>
        <div className="description">
          <p>Made with love by kal-J</p>
        </div>
      </div>
    </section>
  );
};

export default Footer;
