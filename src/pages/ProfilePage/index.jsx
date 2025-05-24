import { Header } from "../../components/Header/Header";
import { Footer } from "../../components/Footer/Footer";
import { SidebarTabs } from "../../components/SidebarTabs/SidebarTabs";
import { Outlet } from "react-router-dom";

export default function ProfilePage() {
  return (
    <>
      <Header />
      <div style={{ display: "flex", minHeight: "80vh" }}>
        <SidebarTabs />
        <div style={{ flex: 1, padding: "2rem" }}>
          <Outlet />
        </div>
      </div>
      <Footer />
    </>
  );
}
