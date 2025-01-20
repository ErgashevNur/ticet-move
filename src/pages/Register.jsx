import { Form, Link, useActionData } from "react-router-dom";
import FormInput from "../components/FormInput";
import { useEffect, useState } from "react";
import { useRegister } from "../hook/useRegister";
import { validateSignupOrLoginData } from "../utils";
import { useSelector } from "react-redux";
import { useAuthWithGoogle } from "../hook/useAuthWithGoogle";
import { Button } from "@/components/ui/button";

// action
export const action = async ({ request }) => {
  const form = await request.formData();
  const displayName = form.get("name");
  const email = form.get("email");
  const password = form.get("password");
  const confirmPassword = form.get("repeatPassword");
  return { displayName, email, password, confirmPassword };
};

function Register() {
  const { googleSignIn, isPanding } = useAuthWithGoogle();
  const { isPending } = useSelector((store) => store.user);
  const [error, setError] = useState({
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { registerWithEmailAndPassword } = useRegister();
  const signUpActionData = useActionData();
  useEffect(() => {
    if (signUpActionData) {
      const { valid, errors } = validateSignupOrLoginData(
        signUpActionData,
        true
      );
      if (valid) {
        const { displayName, email, password } = signUpActionData;
        registerWithEmailAndPassword(displayName, email, password);
      } else {
        setError(errors);
      }
    }
  }, [signUpActionData]);
  return (
    <div>
      <div className="min-h-screen grid place-items-center w-full bg-[url('/10676795.jpg')] bg-cover bg-center">
        <Form
          method="post"
          className="mx-auto w-full bg-white/10 backdrop-blur-lg rounded-xl p-20 py-10 shadow-lg max-w-xl"
        >
          <h2 className="text-4xl text-center mb-5 font-bold">Register</h2>

          <div className="flex flex-col">
            <FormInput
              type="text"
              placeholder="Name"
              label="Display Name"
              name="name"
              error={error.displayName && "input-error"}
              errorText={error.displayName}
            />
            <FormInput
              type="email"
              placeholder="Email"
              label="Email"
              name="email"
              error={error.email && "input-error"}
              errorText={error.email}
            />
            <FormInput
              type="password"
              placeholder="Password"
              label="Password"
              name="password"
              error={error.password && "input-error"}
              errorText={error.password}
            />
            <FormInput
              type="password"
              placeholder="Repeat Password"
              label="Repeat Password"
              name="repeatPassword"
              error={error.confirmPassword && "input-error"}
              errorText={error.confirmPassword}
            />
          </div>

          <div className="my-5 mt-6">
            <div className="my-5">
              {!isPending && (
                <Button type="submit" className="block w-full">
                  Log In
                </Button>
              )}
              {isPending && (
                <Button type="submit" className="block w-full" disabled>
                  Loading...
                </Button>
              )}
            </div>

            <div>
              <Button
                disabled={isPanding}
                onClick={googleSignIn}
                type="button"
                className="block w-full"
              >
                {isPanding ? "Loading.." : "Google"}
              </Button>
            </div>
          </div>

          <div className="text-center">
            <p className="text-white">
              If you have an account/{" "}
              <Button variant="link">
                <Link
                  to="/login"
                  className="font-bold text-base text-white hover:text-gray-300"
                >
                  Log In
                </Link>
              </Button>
            </p>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Register;
