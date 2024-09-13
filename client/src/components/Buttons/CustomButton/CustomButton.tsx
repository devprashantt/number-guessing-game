// @ts-ignore
import styles from "./CustomButton.module.scss";

type Props = {
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
};

const CustomButton = (props: Props) => {
  return (
    <button
      className={
        props.className
          ? `${styles.custom_button} ${props.className}`
          : styles.custom_button
      }
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default CustomButton;
