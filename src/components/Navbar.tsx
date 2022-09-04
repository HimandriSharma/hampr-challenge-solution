import { Layout } from "antd";
import Logo from "../img/Mortal-Kombat-Logo.png";

const { Header } = Layout;

const Navbar = () => {
  return (
    <Layout style={{ backgroundColor: "white", width: "100%", height: "100%" }}>
      <Header
        style={{
          position: "fixed",
          top: "0",
          width: "100%",
          height: "3rem",
          backgroundColor: "black",
          zIndex: "1",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <img src={Logo} alt="Rick and Morty header logo" style={{height:"5rem"}}/>
      </Header>
    </Layout>
  );
};

export default Navbar;
