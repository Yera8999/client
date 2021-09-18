import React, { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Link from "next/link";
import { TextField } from "@material-ui/core";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { RegisterFormSchema } from "../utils/schemas/registerValidation";
import { url } from "../utils/url";

export const SignUpComponent: React.FC = () => {
  const hookForm = useForm({
    mode: "onChange",
    resolver: yupResolver(RegisterFormSchema),
  });
  const values = hookForm.getValues();
  const disableButtonOptions =
    !!hookForm.formState.errors.email?.message ||
    !!hookForm.formState.errors.username?.message ||
    !!hookForm.formState.errors.password?.message ||
    !values.email ||
    !values.username ||
    !values.password;
  const [regErrMessage, setRegErrMessage] = useState("");
  const history = useRouter();
  const registerHandler = async () => {
    try {
      await axios
        .post(
          `${url}/api/auth/sign-up`,
          { ...values },
          {
            withCredentials: true,
          }
        )
        .then(() => {
          history.push("/sign-in");
        })
        .catch((err) => {
          setRegErrMessage(err.response.data.message);
        });
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="container login-form">
      <h4>Регистрация</h4>
      <form onSubmit={(e) => e.preventDefault()}>
        <TextField
          {...hookForm.register("email")}
          name="email"
          type="email"
          size="small"
          className="text-field"
          label="Почта"
          variant="outlined"
          error={!!hookForm.formState.errors.email?.message}
          helperText={hookForm.formState.errors.email?.message}
          fullWidth
          required
        />
        <TextField
          {...hookForm.register("username")}
          name="username"
          type="text"
          size="small"
          className="text-field"
          label="Имя пользователя"
          variant="outlined"
          error={!!hookForm.formState.errors.username?.message}
          helperText={hookForm.formState.errors.username?.message}
          fullWidth
          required
        />
        <TextField
          {...hookForm.register("password")}
          name="password"
          type="password"
          size="small"
          className="text-field"
          label="Пароль"
          variant="outlined"
          error={!!hookForm.formState.errors.password?.message}
          helperText={hookForm.formState.errors.password?.message}
          fullWidth
          required
        />
        {regErrMessage ? (
          <div className="alert alert-danger" role="alert">
            {regErrMessage}
          </div>
        ) : null}
        <button
          type="submit"
          className="btn btn-primary"
          disabled={disableButtonOptions}
          onClick={() => registerHandler()}
        >
          Submit
        </button>
        <Link href="/sign-in">
          <a className="btn btn-outline-dark btn-not-acc">Уже есть аккаунт ?</a>
        </Link>
      </form>
    </div>
  );
};
