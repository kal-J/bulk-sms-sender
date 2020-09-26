import React from 'react';
import './btn_start.scss';
import './how_it_works.scss';
import { Link } from 'react-router-dom';

const HowItWorks = () => (
  <section className="how_it_works">
    <h4>This is how easy it is</h4>
    <div className="actions_wrapper">
      <div className="action">
        <span>1</span>
        <span>Sign in</span>
      </div>
      <div className="action">
        <span>2</span>
        <span>write message</span>
      </div>
      <div className="action">
        <span>3</span>
        <span>send</span>
      </div>
    </div>
  </section>
);

const BtnStart = () => (
  <div className="send_now">
    <Link to="/signin">
      <button>GET STARTED</button>
    </Link>
  </div>
);

const Index = () => {
  return (
    <section className="call_to_action">
      <BtnStart />
      <HowItWorks />
    </section>
  );
};

export default Index;
