import React from 'react';

export const EnFlagIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 60 30" xmlns="http://www.w3.org/2000/svg">
    <clipPath id="a">
      <path d="M0 0v30h60V0z"/>
    </clipPath>
    <path d="M0 0v30h60V0z" fill="#012169"/>
    <path d="M0 0 L60 30 M60 0 L0 30" stroke="#fff" strokeWidth="6"/>
    <path d="M0 0 L60 30 M60 0 L0 30" clipPath="url(#a)" stroke="#C8102E" strokeWidth="4"/>
    <path d="M30 0v30M0 15h60" stroke="#fff" strokeWidth="10"/>
    <path d="M30 0v30M0 15h60" stroke="#C8102E" strokeWidth="6"/>
  </svg>
);
