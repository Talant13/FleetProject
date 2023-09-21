import { authRoles } from 'app/auth';
import Login from './Login';
import Login2Page from '../pages/auth/login-2/Login2Page';

const LoginConfig = {
  settings: {
    layout: {
      config: {
        navbar: {
          display: false
        },
        toolbar: {
          display: false
        },
        footer: {
          display: false
        },
        leftSidePanel: {
          display: false
        },
        rightSidePanel: {
          display: false
        }
      }
    }
  },
  auth: authRoles.onlyGuest,
  routes: [
    {
      path: '/login',
      component: Login
      //component: Login2Page
    }
  ]
};

export default LoginConfig;
