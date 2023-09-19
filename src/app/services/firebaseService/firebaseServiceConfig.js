const prodConfig = {
  apiKey: 'AIzaSyAz-70ccoyyhWtpX8F0xWaeZpi1AgUR0Nc',
  authDomain: 'cargo-fleet-e1e85.firebaseapp.com',
  databaseURL: 'https://cargo-fleet-e1e85-default-rtdb.firebaseio.com',
  projectId: 'cargo-fleet-e1e85',
  storageBucket: 'cargo-fleet-e1e85.appspot.com',
  messagingSenderId: '571443532642',
  appId: '1:571443532642:web:ae7b3ff06a0adcd559123b',
  measurementId: 'G-XGYS02PSQL'
};
const devConfig = {
  apiKey: 'AIzaSyAz-70ccoyyhWtpX8F0xWaeZpi1AgUR0Nc',
  authDomain: 'cargo-fleet-e1e85.firebaseapp.com',
  databaseURL: 'https://cargo-fleet-e1e85-default-rtdb.firebaseio.com',
  projectId: 'cargo-fleet-e1e85',
  storageBucket: 'cargo-fleet-e1e85.appspot.com',
  messagingSenderId: '571443532642',
  appId: '1:571443532642:web:ae7b3ff06a0adcd559123b',
  measurementId: 'G-XGYS02PSQL'
};

const config = process.env.NODE_ENV === 'production' ? prodConfig : devConfig;

export default config;

// const prodConfig = {
//   apiKey: 'AIzaSyAo9XhYAvVgtVynXridFdsg4Qtb0DvgTo0',
//   authDomain: 'emplosoft-2db9f.firebaseapp.com',
//   projectId: 'emplosoft-2db9f',
//   databaseURL: 'https://emplosoft-2db9f-default-rtdb.firebaseio.com',
//   storageBucket: 'emplosoft-2db9f.appspot.com',
//   messagingSenderId: '460039525265',
//   appId: '1:460039525265:web:aec32080d87de88acf0030'
// };
// const devConfig = {
//   apiKey: 'AIzaSyAo9XhYAvVgtVynXridFdsg4Qtb0DvgTo0',
//   authDomain: 'emplosoft-2db9f.firebaseapp.com',
//   projectId: 'emplosoft-2db9f',
//   databaseURL: 'https://emplosoft-2db9f-default-rtdb.firebaseio.com',
//   storageBucket: 'emplosoft-2db9f.appspot.com',
//   messagingSenderId: '460039525265',
//   appId: '1:460039525265:web:aec32080d87de88acf0030'
// };

// const config = process.env.NODE_ENV === 'production' ? prodConfig : devConfig;

// export default config;
