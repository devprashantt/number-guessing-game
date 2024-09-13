// @ts-ignore
import styles from "./SimpleInput.module.scss";

type Props = {
  type?: string;
  value?: any;
  onChange?: any;
  errorState?: boolean;
  placeholder?: string;
  width?: number;
  disabled?: boolean;
  handleKeyDown?: any;
};

const SimpleInput = (props: Props) => {
  return (
    <input
      style={{
        width: props.width ? `${props.width}rem` : "100%",
        backgroundColor: props.disabled ? "rgba(204, 204, 204, 0.20)" : "#fff",
        border: props.disabled ? "0.5px solid #CCC" : "0.5px solid #A899F1",
      }}
      className={props.errorState ? styles.error_input : styles.simple_input}
      type={props.type || "text"}
      value={props.value}
      onChange={props.disabled ? () => {} : props.onChange}
      placeholder={props.placeholder || ""}
      onKeyDown={props.handleKeyDown}
    />
  );
};

export default SimpleInput;
