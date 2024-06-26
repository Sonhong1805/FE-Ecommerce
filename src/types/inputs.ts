interface ILoginInputs {
  email: string;
  password: string;
}

interface IForgotPasswordInputs extends ILoginInputs {
  confirmPassword?: string;
}

interface ISignUpInputs extends IForgotPasswordInputs {
  username?: string;
}

interface ILoginWithNextAuth {
  username: string;
  email: string;
  avatar: string;
}
