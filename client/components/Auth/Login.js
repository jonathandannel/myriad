import { createElement as h, useState } from "react";
import { connect } from "react-redux";
import { TextField, Button, Typography, Paper } from "@material-ui/core";

import { withRouter } from "react-router-dom";
import { loginFormStyles } from "../styles";
import useLoginForm from "../../hooks/useLoginForm";
import { login } from "../../api";

import { setUser, setJwt } from "../../actions/userActions";

const mapDispatchToProps = dispatch => ({
  setUser: user => dispatch(setUser(user)),
  setJwt: token => dispatch(setJwt(token))
});

const Login = ({ setUser, setJwt, history, closeLogin, openRegister }) => {
  const requestLogin = fieldValues =>
    login(fieldValues).then(({ message, token, user, success }) => {
      setSubmissionStatus({
        success,
        message
      });
      if (success) {
        setUser(user);
        setJwt(token);
        history.push("/app");
      }
    });

  const styles = loginFormStyles();
  const [submissionStatus, setSubmissionStatus] = useState(false);
  const { handleChange, handleSubmit } = useLoginForm(requestLogin);

  return h(
    Paper,
    { elevation: 3, className: styles.formPaper },
    h(
      "form",
      { className: styles.formContainer, onSubmit: handleSubmit },
      h(TextField, {
        name: "username",
        placeholder: "Username",
        label: "Username",
        onChange: handleChange,
        variant: "outlined",
        className: styles.textField
      }),
      h(TextField, {
        name: "password",
        type: "password",
        placeholder: "Password",
        variant: "outlined",
        label: "Password",
        onChange: handleChange,
        className: styles.textField
      }),
      submissionStatus &&
        h(
          Typography,
          {
            variant: "caption",
            color: !submissionStatus.success ? "error" : ""
          },
          submissionStatus.message
        ),
      h(
        "div",
        { className: styles.buttonContainer },
        h(
          Button,
          {
            type: "submit",
            color: "primary",
            variant: "contained",
            className: styles.button
          },
          "Log in"
        )
      ),
      h(
        "div",
        { className: styles.alreadyHave },
        h(
          Typography,
          { style: { paddingRight: "0.25rem" }, variant: "caption" },
          `Don't have an account yet?`
        ),
        h(
          "a",
          {
            className: styles.alreadyHaveA,
            style: { textDecoration: "none" },
            href: "#",
            onClick: () => {
              closeLogin();
              openRegister();
            }
          },
          h(
            Typography,
            { variant: "caption", color: "secondary" },
            "Register a new account."
          )
        )
      )
    )
  );
};

export default withRouter(connect(null, mapDispatchToProps)(Login));
