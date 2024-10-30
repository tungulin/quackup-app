import { lazy, useEffect } from 'react';
import ReactGA from 'react-ga4';

const League = () => {
  useEffect(() => {
    ReactGA.send({
      hitType: 'pageview',
      page: '/league',
      title: 'League',
    });
  }, []);

  return <div>League</div>;
};

export default League;
