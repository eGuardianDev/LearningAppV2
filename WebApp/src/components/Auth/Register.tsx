import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { trpc } from "../../utils/trpc";
import { ISignUp, signUpSchema } from "../../utils/validation/auth";
interface props {
  authStyle: { readonly [key: string]: string };
}

function Register({ authStyle }: props) {
  const router = useRouter();
  const [comfirm, setComfirm] = useState("");
  const { register, handleSubmit } = useForm<ISignUp>({
    resolver: zodResolver(signUpSchema),
  });

  const { mutateAsync } = trpc.useMutation(["auth.signup"]);

  const onSubmit = useCallback(
    async (data: ISignUp) => {
      if (data.password !== comfirm) {
        alert('dont')
      } else {
        const result = await mutateAsync(data);
        if (result.status === 201) {
          router.push("/");
        }
      }
    },
    [mutateAsync, router,comfirm]
  );

  return (
    <div className={authStyle.register}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className={authStyle.authLabel} htmlFor="chk" aria-hidden="true">
          Register
        </label>
        <input
          className={authStyle.authInput}
          type="text"
          placeholder="Name"
          required
          {...register("name")}
        />
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
          {...register("password")}
        />
        <input
          className={authStyle.authInput}
          type="password"
          placeholder="Confirm password"
          required
          onChange={(e) => setComfirm(e.target.value)}
          value={comfirm}
        />
        <button className={authStyle.authButton}>Register</button>
      </form>
    </div>
  );
}

export default Register;
