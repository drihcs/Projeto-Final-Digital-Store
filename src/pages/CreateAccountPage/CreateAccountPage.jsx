import { Footer } from "../../components/Footer/Footer.jsx";
import { UserRegister } from "../../components/UserRegister/UserRegister.jsx";
import { HeaderLogo } from "../../components/HeaderLogo/HeaderLogo.jsx";


export function CreateAccountPage() {
  return (
    <>
      <HeaderLogo />
      <UserRegister />
      <Footer />
    </>
  );
}
