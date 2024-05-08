"use client";

import { authorize } from "../../services/endpoints/users";
import { useContext } from "react";
import { AuthContext } from "@/app/store/auth-context";
import classes from "./AuthForm.module.css";
import Button from "../Button/Button";
import { toast } from "react-toastify";
import { Formik, Field, Form } from "formik";

function AuthForm() {
  const { authorized, setAuthorized } = useContext(AuthContext);

  const notifyLogIn = () =>
    toast.success("You are logged in!", {
      position: "top-center",
      autoClose: 2000,
    });
  const notifyError = () =>
    toast.error("Wrong login or password!", {
      position: "top-center",
      autoClose: 2000,
    });
  const notifyLogOut = () =>
    toast.info("You are logged out!", {
      position: "top-center",
      autoClose: 2000,
    });

  const initialValues = {
    login: "",
    password: "",
  };

  const validate = (values) => {
    const errors = {};

    if (!values.login) {
      errors.login = "Required";
    }

    if (!values.password) {
      errors.password = "Required";
    }

    return errors;
  };

  const submitHandler = (values) => {
    authorize(values)
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        setAuthorized(true);
        notifyLogIn();
      })
      .catch((error) => {
        console.log(error);
        notifyError();
      });
  };

  const logOutHandler = () => {
    setAuthorized(false);
    localStorage.removeItem("token");
    notifyLogOut();
  };

  return (
    <Formik
      initialValues={initialValues}
      validate={validate}
      onSubmit={submitHandler}
    >
      {({ errors, touched }) => (
        <Form className={classes.form}>
          {!authorized && (
            <>
              <div className={classes.control}>
                <Field
                  className={`${classes.input} ${
                    errors.login && touched.login ? classes.error : ""
                  }`}
                  type="text"
                  name="login"
                  placeholder={
                    errors.login && touched.login ? errors.login : "Login"
                  }
                />
                <Field
                  className={`${classes.input} ${
                    errors.password && touched.password ? classes.error : ""
                  }`}
                  type="password"
                  name="password"
                  placeholder={
                    errors.password && touched.password
                      ? errors.password
                      : "Password"
                  }
                />
              </div>
              <Button variant="primary" type="submit">
                Log in
              </Button>
            </>
          )}
          {authorized && (
            <Button variant="warning" type="button" onClick={logOutHandler}>
              Log out
            </Button>
          )}
        </Form>
      )}
    </Formik>
  );
}

export default AuthForm;
