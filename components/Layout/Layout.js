import Footer from "./Footer";
import MainHeader from "./MainHeader";

const Layout = (props) => {
  return (
    <div className="layout">
      <MainHeader />
      <main className="main-container">
        {props.children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
