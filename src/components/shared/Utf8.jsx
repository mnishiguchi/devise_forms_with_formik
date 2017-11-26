import React from 'react';

// Rails uses the accept-charset attribute in your form element to let the server know that it
// should be able to deal with unicode characters.
// http://www.seqmedia.com/2011/02/18/rails-forms-automatically-insert-a-hidden-utf8-field/
const Utf8 = () => <input name="utf8" readOnly type="hidden" value="✓" />;

Utf8.propTypes = {};

export default Utf8;
