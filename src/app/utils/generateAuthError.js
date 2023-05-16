export const generateAuthError = (message) => {
  switch (message) {
    case "INVALID_PASSWORD":
      return "Email or password is not correct";
    case "EMAIL_NOT_FOUND":
      return "Email or password is not correct";
    case "EMAIL_EXISTS":
      return "Email is already exist!";
    default:
      return "You entered wrong password or email too many times. Try again later!";
  }
};
