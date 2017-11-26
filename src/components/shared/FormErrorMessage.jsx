import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Message } from 'semantic-ui-react';

const FormErrorMessage = ({ errors, touched, header }) => {
  // Array of field names
  const touchedFieldNames = Object.entries(touched).map(
    field => field[1] && field[0]
  );

  // Array of error reasons for touched fields, ignoring undefined errors
  const list = _.compact(
    touchedFieldNames.map(touchedFieldName => errors[touchedFieldName])
  );

  return (
    list.length > 0 && (
      <Message
        negative
        header={header || 'Form not yet submitted'}
        list={list}
      />
    )
  );
};

FormErrorMessage.propTypes = {
  errors: PropTypes.object,
  touched: PropTypes.object,
  header: PropTypes.string,
}

export default FormErrorMessage
