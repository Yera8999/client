import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginFormSchema } from "../utils/schemas/loginValidation";
import { TextField } from "@material-ui/core";
import { useRouter } from "next/router";
import { url } from "../utils/url";
export const SignInComponent: React.FC = () => {
  const router = useRouter();
  const hookForm = useForm({
    mode: "onChange",
    resolver: yupResolver(LoginFormSchema),
  });
  const values = hookForm.getValues();

  const disableButtonOptions =
    !!hookForm.formState.errors.email?.message ||
    !!hookForm.formState.errors.password?.message ||
    !values.email ||
    !values.password;
  const [errMessage, setErrMessage] = useState("");

  const loginHandler = async () => {
    await axios
      .post(
        `${url}/api/auth/sign-in`,
        { ...values },
        {
          withCredentials: true,
        }
      )
      .then(() => {
        router.reload();
      })
      .catch((err) => {
        setErrMessage(err.response.data.message);
      });
  };
  return (
    <div className="container login-form">
      <h3>Авторизация</h3>
      <div>
        <h4>Логин</h4>
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
          {errMessage && (
            <div className="alert alert-danger" role="alert">
              {errMessage}
            </div>
          )}
          <button
            type="submit"
            className="btn btn-primary"
            disabled={disableButtonOptions}
            onClick={() => loginHandler()}
          >
            Submit
          </button>
          <Link href="/sign-up">
            <a className="btn btn-outline-dark btn-not-acc">Нет аккаунта ?</a>
          </Link>
        </form>
      </div>
    </div>
  );
};
