import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/options";

export default async function getUserSession() {
  return await getServerSession(authOptions);
}
