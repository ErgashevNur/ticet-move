import { Form, Link, useActionData } from "react-router-dom";
import FormInput from "../components/FormInput";
import { useLogin } from "../hook/useLogin";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { useAuthWithGoogle } from "@/hook/useAuthWithGoogle";

export const action = async ({ request }) => {
  const form = await request.formData();
  const email = form.get("email");
  const password = form.get("password");
  return { email, password };
};

function Login() {
  const { googleSignIn, isPanding } = useAuthWithGoogle();

  const { isPending } = useSelector((store) => store.user);
  const { loginWithEmailAndPassword } = useLogin();
  const data = useActionData();
  console.log(data);
  useEffect(() => {
    if (data) {
      loginWithEmailAndPassword(data.email, data.password);
    }
  }, [data]);

  return (
    <div>
      <div className="h-screen grid place-items-center w-full bg-[url('/10676795.jpg')] bg-cover bg-center">
        <Form
          method="post"
          className="mx-auto w-full bg-white/10 backdrop-blur-lg rounded-xl p-14 shadow-lg max-w-lg"
        >
          <h2 className="text-4xl text-center mb-5 font-bold">Log In</h2>
          <div className="mb-4">
            <FormInput
              type="email"
              className="mb-5"
              placeholder="Name"
              label="Email"
              name="email"
            />
          </div>

          <div className="mb-5">
            <FormInput
              type="password"
              placeholder="Password"
              label="Password"
              name="password"
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
            <p>
              If you don't have account /
              <Button variant="link">
                <Link to="/register" className="font-bold text-base">
                  Register
                </Link>
              </Button>
            </p>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Login;
