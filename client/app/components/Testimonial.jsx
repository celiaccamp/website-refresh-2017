import React from 'react';
import { Icon } from 'semantic-ui-react';

const Testimonial = ({ children, by }) => (
  <div className="testimonial">

    <p>
      <Icon name="quote left" size="big" className="left-quote" />
      <i>{children}</i>
      <Icon name="quote right" size="big" className="right-quote" />
    </p>
    <div className="quote-footer">
      <strong>{`--${by}`}</strong>
    </div>

  </div>
);

export default Testimonial;
