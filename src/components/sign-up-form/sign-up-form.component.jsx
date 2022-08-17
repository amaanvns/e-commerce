import { useState } from "react";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";
import { doc, setDoc, getDoc } from "firebase/firestore";
import FormInput from "../form-input/form-input.component";
import "./sign-up-form.styles.scss";
import Button from "../button/button.component";

const SignUpForm = () => {
  const defaultFormFields = {
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const [formField, setFormField] = useState(defaultFormFields);

  const { displayName, email, password, confirmPassword } = formField;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormField({ ...formField, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("password not matching");
      return;
    }
    try {
      const userCredentials = await createAuthUserWithEmailAndPassword(
        email,
        password
      );

      const user = userCredentials.user;
      const userDocRef = await createUserDocumentFromAuth(user, {
        displayName,
      });
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("Email alreadyn exist");
      } else {
        console.log(error);
      }
    }
    setFormField(defaultFormFields);
  };

  return (
    <div className="sign-up-container">
      <h2>Don't have an account</h2>
      <span>Sign Up with email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          required
          label="Name"
          type="text"
          name="displayName"
          value={displayName}
          onChange={handleChange}
        />

        <FormInput
          required
          label="Email"
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
        />

        <FormInput
          required
          label="Password"
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
        />

        <FormInput
          required
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={handleChange}
        />
        <Button type="submit">Sign Up </Button>
      </form>
    </div>
  );
};

export default SignUpForm;
