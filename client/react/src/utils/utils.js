import alertify from 'alertify.js';

export const showAlert = (message, type) => {
  if (type === 'success') {
    alertify.success(message);
  } else if (type === 'error') {
    alertify.error(message);
  } else {
    alertify.log(message);
  }
};
