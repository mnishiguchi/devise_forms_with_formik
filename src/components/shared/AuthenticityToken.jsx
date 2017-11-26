import React from 'react';

const AuthenticityToken = () => {
  const meta = document.querySelector('meta[name="csrf-token"]');
  const csrfToken = meta && meta.content;
  return (
    <input name="authenticity_token" readOnly type="hidden" value={csrfToken} />
  );
};

export default AuthenticityToken;
