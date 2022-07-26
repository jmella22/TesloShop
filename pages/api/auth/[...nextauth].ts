import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    Credentials({
      name: "Custom Login",
      credentials: {
        email: {
          label: "Correo",
          type: "email",
          placeholder: "ingresa tu correo",
        },
        password: {
          label: "Contraseña",
          type: "password",
          placeholder: "ingresa tu contraseña",
        },
      },
      async authorize(credentials, req) {
        console.log(credentials);
        return { name: "juan", correo: "pepito@pepito.com", rol: "admid" };
      },
    }),
    GitHubProvider({
      clientId: `${process.env.GITHUB_ID}`,
      clientSecret: `${process.env.GITHUB_SECRET}`,
      // clientId: process.env.GITHUB_ID,
      // clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
});
