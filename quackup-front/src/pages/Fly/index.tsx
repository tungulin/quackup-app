import { lazy, useEffect } from 'react';
import ReactGA from 'react-ga4';

const Fly = () => {
  useEffect(() => {
    ReactGA.send({
      hitType: 'pageview',
      page: '/fly',
      title: 'Fly',
    });
  }, []);

  return <div>Fly</div>;
};

export default Fly;
