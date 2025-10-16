import React from 'react';

export const ArFlagIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 600">
    <rect width="900" height="600" fill="#006c35"/>
    <path d="M150 450 L750 450 L720 420 L180 420 Z" fill="#fff"/>
    <path d="M150 450 L750 450 L720 420 L180 420 Z" transform="scale(-1, 1) translate(-900, 0)" fill="#fff"/>
  </svg>
);