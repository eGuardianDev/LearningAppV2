import React, { useCallback, useState } from "react";
import FacebookButton from "./Providers Buttons/FacebookButton";
import GoogleButton from "./Providers Buttons/GoogleButton";
import TwiiterButton from "./Providers Buttons/TwiiterButton";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { ILogin, loginSchema } from "../../utils/validation/auth";
interface props {
  authStyle: { readonly [key: string]: string };
}
function Login({ authStyle }: props) {
  const [provider, setProvider] = useState<string>("");

  const { register, handleSubmit } = useForm<ILogin>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = useCallback(async (data: ILogin) => {
    const res = await signIn("credentials", { ...data, callbackUrl: "/" });
    console.log(res);
  }, []);

  return (
    <div id="login" className={authStyle.login}>
      <label className={authStyle.authLabel} htmlFor="chk" aria-hidden="true">
        Login
      </label>

      <form
        className="flex justify-evenly w-4/5 mx-auto"
        onSubmit={async (e) => {
          e.preventDefault();
          provider !== "" && (await signIn(provider, { callbackUrl: "/" }));
        }}
      >
        <GoogleButton setProvider={setProvider} />
        <FacebookButton setProvider={setProvider} />
        <TwiiterButton />
      </form>
      <hr className="h-0.5 bg-gray-400 w-4/5 my-2 mx-auto" />
      <form
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          className={authStyle.authInput}
          type="email"
          placeholder="Email"
          required
          {...register("email")}
        />
        <input
          className={authStyle.authInput}
          type="password"
          placeholder="Password"
          required
          {...register("password")}
        />
        <button className={authStyle.authButton}>Login</button>
      </form>
    </div>
  );
}
export interface ProviderButtonProps {
  setProvider: React.Dispatch<React.SetStateAction<string>>;
}

export default Login;
