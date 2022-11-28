import Link from "next/link";
import { BsBagCheckFill } from "../Icons";
import styles from "./Success.module.css";

const Success = () => {
  return (
    <div className={styles["success-wrapper"]}>
      <div className={styles.success}>
        <p className={styles.icon}>
          <BsBagCheckFill />
        </p>
        <h2>Thank you for your order!</h2>
        <p className={styles["email-msg"]}>
          Check your email inbox for the receipt.
        </p>
        <p className={styles.description}>
          If you have any questions, please email
          <a className={styles.email} href="mailto:order@example.com">
            order@example.com
          </a>
        </p>
        <Link href="/">
          <button type="button" width="300px" className="btn">
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Success;
