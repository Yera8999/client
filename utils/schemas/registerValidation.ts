import * as yup from "yup";

export const RegisterFormSchema = yup.object().shape({
  email: yup.string().email("Неверная почта!").required("Почта обязательна!"),
  username: yup.string().required("Имя пользователя обязательно!"),
  password: yup
    .string()
    .min(6, "Пароль должен быть не менее 6 символов")
    .required("Пароль обязателен!"),
});
