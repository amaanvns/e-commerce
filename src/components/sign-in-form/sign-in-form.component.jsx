import { useState } from "react";
import { signInUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import "./sign-in-form.styles.scss";
import Button from "../button/button.component";
import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

const SignInForm = () => {
  const [formField, setFormField] = useState({ email: "", password: "" });
  const { email, password } = formField;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormField({ ...formField, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInUserWithEmailAndPassword(
        email,
        password
      );
    } catch (error) {
      alert(error.message);
      console.log(error.message);
    }
    setFormField({
      email: "",
      password: "",
    });
  };

  const signInWithGoogle = async () => {
    const response = await signInWithGooglePopup();
    await createUserDocumentFromAuth(response.user);
  };

  return (
    <div className="sign-up-container">
      <h2>Already have an account?</h2>
      <span>Sign Up with email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          required
          label="Email"
          type="email"
          value={email}
          onChange={handleChange}
          name="email"
        />

        <FormInput
          required
          label="Password"
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
        />
        <div className="buttons-container">
          <Button type="submit">Sign In</Button>
          <Button type="button" onClick={signInWithGoogle} buttonType="google">
            Google Sign In
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
