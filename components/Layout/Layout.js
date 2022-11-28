import Footer from "./Footer";
import MainHeader from "./MainHeader";
import styles from "./Layout.module.css";

const Layout = (props) => {
  return (
    <div className={styles.layout}>
      <MainHeader />
      <main className={styles.main}>
        <div className="shape"></div>
        <div>{props.children}</div>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
