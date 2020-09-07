import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';

/**
 * Scrolls page to top after location change.
 * https://reacttraining.com/react-router/web/guides/scroll-restoration
 */
const ScrollToTop = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return children;
};

ScrollToTop.propTypes = {
  children: PropTypes.node
};

export default ScrollToTop;
