import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import { client } from "./sanity/lib/client"
import { AUTHOR_BY_GITHUB_ID_QUERY, AUTHOR_BY_GOOGLE_ID_QUERY } from "./sanity/lib/queries"
import { writeClient } from "./sanity/lib/write-client"
 
export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [GitHub, Google],
  callbacks: {
  async signIn({ user: { name, email, image }, profile, account }) {
    const id = profile?.id || profile?.sub; // Google uses "sub", GitHub uses "id"
    const username = profile?.login || profile?.name?.split(" ").join("").toLowerCase();

    const query = account.provider === "github"
      ? AUTHOR_BY_GITHUB_ID_QUERY
      : AUTHOR_BY_GOOGLE_ID_QUERY;

    const existingUser = await client
      .withConfig({ useCdn: false })
      .fetch(query, { id });

    if (!existingUser) {
      await writeClient.create({
        _type: "author",
        id,
        name,
        username,
        email,
        image,
        bio: profile?.bio || "",
      });
    }

    return true;
  },

  async jwt({ token, account, profile }) {
    if (account && profile) {
      const id = profile?.id || profile?.sub;

      const query = account.provider === "github"
        ? AUTHOR_BY_GITHUB_ID_QUERY
        : AUTHOR_BY_GOOGLE_ID_QUERY;

      const user = await client.withConfig({ useCdn: false }).fetch(query, { id });
      token.id = user?._id;
    }
    return token;
  },

  async session({ session, token }) {
    Object.assign(session, { id: token?.id });
    return session;
  },
}

});