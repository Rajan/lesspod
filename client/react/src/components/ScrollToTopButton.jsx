import React from 'react';
import ScrollToTopButton from 'react-scroll-up';

import { blueBg } from '../config/Colors';

export const STTButton = params => (
  <ScrollToTopButton showUnder={160} style={{ zIndex: 999999999 }}>
    <i className="fa fa-chevron-circle-up fa-3x" style={{ color: blueBg }} />
  </ScrollToTopButton>
);
