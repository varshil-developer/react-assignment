import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import * as _ from 'lodash';
import { users } from '../userList/InvitesList'
import CryptoJS from 'crypto-js';
import { toast } from 'react-toastify';


const loginSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Email is Required').trim('Space is not allowed').strict(true),
  password: Yup.string().required('Password is Required').trim('Space is not allowed').strict(true),
});


const Login = () => {

  return (
    <main className="login-page__main">
      <div className="login-bg-block">
        <div className="login-content-block">
          <div className="page-block__main">
            <div className="title">Login</div>
            <div className="login-form__block">
              <Formik
                initialValues={{ email: '', password: '' }}
                validationSchema={loginSchema}
                onSubmit={(values, { setSubmitting }) => {
                  const userList = _.filter(users, values);
                  {
                    _.isEmpty(userList) ? (
                      toast.error('Invalid email and password')
                    )
                      :
                      (
                        _.map(userList, (data) => {
                          const userData = CryptoJS.AES.encrypt(JSON.stringify(data), 'userList').toString();
                          const userPassword = CryptoJS.AES.encrypt(JSON.stringify(data.password), 'password').toString();
                          toast.success('Login successfully')
                          localStorage.setItem('userData', JSON.stringify(userData))
                          localStorage.setItem('password', JSON.stringify(userPassword))
                          setTimeout(() => {
                            window.location.href = '/invitationList'
                          }, [1000])
                        })
                      )
                  }
                  setSubmitting(false);
                }}
              >
                {({ values, errors, touched, handleSubmit, handleBlur, handleChange, isSubmitting }) => (
                  <Form onSubmit={handleSubmit}>
                    <div className='login-form__block'>
                      <div className='form-content'>
                        <label>Email: </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          onChange={handleChange}
                          value={values.email}
                        />
                        {errors.email && touched.email ? <span className='error-text'>{errors.email}</span> : null}
                      </div>
                      <div className='form-content'>
                        <label>Password: </label>
                        <input
                          type="password"
                          name="password"
                          id="password"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.password}
                        />
                        {errors.password && touched.password ? <span className='error-text'>{errors.password}</span> : null}
                      </div>
                      <div>
                        <button type="submit" disabled={isSubmitting} className="login-button">
                          Login
                        </button>
                      </div>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </main >
  );
};

export default Login;
