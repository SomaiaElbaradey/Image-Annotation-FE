import HomePage from "./HomePage";

// if (!getApps().length) {
//   initializeApp({
//     credential: cert({
//       ...firebaseConfig
//     }),
//   });
// }

export default async function Home() {
  // try {
  //   const cookieHeader = await cookies();
  //   const token = cookieHeader.get(serverConfig.cookieName)?.value;

  //   console.log(token, 'token');

  //   if (!token) {
  //     console.error("No token found in cookies");
  //     redirect("/register");
  //   }

  //   const decodedToken = await getAuth().verifyIdToken(token);

  //   if (!decodedToken?.email) {
  //     console.error("Invalid token, no email found");
  //     redirect("/register");
  //   }

  //   console.log(decodedToken, "decodedToken");

  return <HomePage email={'decodedToken.email'} />;
  // } catch (error) {
  //   console.error("Error during authentication:", error);
  //   redirect("/register");
  // }
}
