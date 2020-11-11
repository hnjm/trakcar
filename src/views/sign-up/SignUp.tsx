import React from 'react';
import { Formik, Form } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { signUpUser, SignupValues, usersSelector } from 'modules/users';
import AuthViewTemplate from 'templates/auth-view-template/AuthViewTemplate';
import Button from 'components/button/Button';
import TextInput from 'components/text-input/TextInput';
import PasswordInput from 'components/password-input/PasswordInput';
import arrow_right_icon from 'assets/svgs/icon_arrow-right.svg';
import { initialValues, validationSchema } from './SignUp.formik';

const SignUp: React.FC = () => {
  const dispatch = useDispatch();
  const { token } = useSelector(usersSelector);

  if (token) {
    return <Redirect to="/" />;
  }

  const handleSubmit = (values: SignupValues) => {
    dispatch(signUpUser(values));
  };

  const togglePageMessage = (
    <p>
      Already have an account? <Link to="/sign-in">Sign in</Link>
    </p>
  );

  return (
    <AuthViewTemplate togglePageMessage={togglePageMessage}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form>
            <TextInput label="name" name="name" type="text" />
            <TextInput label="email" name="email" type="email" />
            <PasswordInput label="password" name="password" />
            <Button type="submit" icon={arrow_right_icon}>
              sign up
            </Button>
          </Form>
        )}
      </Formik>
    </AuthViewTemplate>
  );
};

export default SignUp;
