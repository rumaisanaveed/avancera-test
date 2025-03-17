import { Poppins } from "next/font/google";
import "../styles/globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"], // Define required weights
});

export default function MyApp({ Component, pageProps }) {
  return (
    <div className={poppins.variable}>
      <Component {...pageProps} />
    </div>
  );
}
