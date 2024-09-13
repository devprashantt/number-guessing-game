import IconMap from "./assets/IconMap";

const EmptyIcon = () => <div />;

const Icon = ({ name, size, color, cursor, ...rest }) => {
  const Icon = IconMap[name] || EmptyIcon;

  return (
    <Icon
      color={color}
      style={{ width: size, height: size, cursor: cursor }}
      {...rest}
    />
  );
};

export default Icon;
