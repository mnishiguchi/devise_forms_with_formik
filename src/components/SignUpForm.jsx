import React from 'react';
import PropTypes from 'prop-types';
import { withFormik } from 'formik';
import Yup from 'yup';
import { Form, Button } from 'semantic-ui-react';
import FormErrorMessage from './shared/FormErrorMessage';
import AuthenticityToken from './shared/AuthenticityToken';
import Utf8 from './shared/Utf8';

// https://github.com/jaredpalmer/formik
// https://react.semantic-ui.com/collections/form#form-example-subcomponent-control
const InnerForm = props => {
  const {
    values,
    touched,
    errors,
    dirty,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    handleReset
  } = props;

  // Rails form would generates field ids and names like name="user[email]" id="user_email",
  // it seems like Formik prefers simple keys.
  return (
    <Form
      action="/users/sign_up"
      onSubmit={handleSubmit}
      onKeyPress={event => {
        if (event.which === 13 /* Enter */) {
          event.preventDefault();
        }
      }}
      acceptCharset="UTF-8"
      method="post"
    >
      <Utf8 />
      <AuthenticityToken />

      <Form.Field
        control={Form.Input}
        type="email"
        label="Email"
        name="email"
        placeholder="Enter your email"
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
        className={errors.email && touched.email ? 'error' : ''}
      />

      <Form.Field
        control={Form.Input}
        type="password"
        label="Password"
        name="password"
        placeholder="Enter your password"
        value={values.password}
        onChange={handleChange}
        onBlur={handleBlur}
        className={errors.password && touched.password && 'error'}
      />

      <Form.Field
        control={Form.Input}
        type="password"
        label="Password confirmation"
        name="passwordConfirmation"
        placeholder="Confirm your password"
        value={values.passwordConfirmation}
        onChange={handleChange}
        onBlur={handleBlur}
        className={
          errors.passwordConfirmation && touched.passwordConfirmation && 'error'
        }
      />

      {<FormErrorMessage errors={errors} touched={touched} />}

      <Button onClick={handleReset} disabled={!dirty || isSubmitting}>
        Reset
      </Button>
      <Button positive type="submit" disabled={isSubmitting}>
        Sign Up
      </Button>
    </Form>
  );
};

const SignUpForm = withFormik({
  mapPropsToValues: () => ({
    email: '',
    password: '',
    passwordConfirmation: ''
  }),
  validationSchema: Yup.object().shape({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters long')
      .required('Password is required'),
    passwordConfirmation: Yup.string().required(
      'Password confirmation is required'
    )
  }),
  handleSubmit: (values, { setSubmitting, setFieldError }) => {
    if (values.password !== values.passwordConfirmation) {
      setSubmitting(false);
      setFieldError('password', 'Password must match password confirmation');
      return;
    }

    // Rails wants all the fields to have rails-compatible field names.
    const params = {
      'user[email]': values.email,
      'user[password]': values.password,
      'user[password_confirmation]': values.passwordConfirmation
    };

    // Simulate async request
    setTimeout(() => {
      // TODO: Replace this with axios or fetch.
      alert(JSON.stringify(params, null, 2));

      setSubmitting(false);
    }, 500);
  },
  displayName: 'SignUpForm' // helps with React DevTools
})(InnerForm);

export default SignUpForm;
