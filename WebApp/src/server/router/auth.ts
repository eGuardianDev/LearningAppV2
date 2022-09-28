import * as trpc from "@trpc/server";
import { hash } from "argon2";
import { signUpSchema } from "../../utils/validation/auth";
import { createRouter } from "./context";

export const authRouter = createRouter()
  .query("getSession", {
    resolve({ ctx }) {
      return ctx.session;
    },
  })
  .mutation('signup',{
    input: signUpSchema,
    resolve: async ({ input, ctx }) => {
      const { name, email, password } = input;
  
      const exists = await ctx.prisma.user.findFirst({
        where: { email },
      });
  
      if (exists) {
        throw new trpc.TRPCError({
          code: "CONFLICT",
          message: "User already exists.",
        });
      }
  
      const hashedPassword = await hash(password);
  
      const result = await ctx.prisma.user.create({
        data: { name, email, password: hashedPassword },
      });
  
      return {
        status: 201,
        message: "Account created successfully",
        result: result.email,
      };
    }
  })
  .middleware(async ({ ctx, next }) => {
    // Any queries or mutations after this middleware will
    // raise an error unless there is a current session
    if (!ctx.session) {
      throw new trpc.TRPCError({ code: "UNAUTHORIZED" });
    }
    return next();
  })
  .query("getSecretMessage", {
    async resolve({ ctx }) {
      return "You are logged in and can see this secret message!";
    },
  });
