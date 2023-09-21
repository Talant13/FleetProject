import { lazy } from 'react';
import { authRoles } from 'app/auth';

import ForgotPassword2Page from './ForgotPassword2Page';

const ForgotPassword2PageConfig = {
  settings: {
    layout: {
      config: {}
    }
  },
  // auth: authRoles.user,
  routes: [
    {
      path: '/pages/auth/forgot-password2',
      component: ForgotPassword2Page
    }
  ]
};

export default ForgotPassword2PageConfig;

// import { authRoles } from 'app/auth';
// import Register from './Register';

// const RegisterConfig = {
//   settings: {
//     layout: {
//       config: {
//         navbar: {
//           display: false
//         },
//         toolbar: {
//           display: false
//         },
//         footer: {
//           display: false
//         },
//         leftSidePanel: {
//           display: false
//         },
//         rightSidePanel: {
//           display: false
//         }
//       }
//     }
//   },
//   auth: authRoles.onlyGuest,
//   routes: [
//     {
//       path: '/register',
//       component: Register
//     }
//   ]
// };

// export default RegisterConfig;
