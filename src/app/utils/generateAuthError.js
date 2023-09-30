export const generateAuthError = (message) => {
  switch (message) {
    case "INVALID_PASSWORD":
      return "Email або пароль є невірним";
    case "EMAIL_NOT_FOUND":
      return "Email або пароль є невірним";
    case "EMAIL_EXISTS":
      return "Email вже існує!";
    default:
      return "Ви ввели неправильний пароль або Email занадто багато разів.Спробуйте пізніше!";
  }
};
