export const Icon = ({ className, name, size = 24, color }: any) => {
  try {
    const IconComponent = require(`../../assets/icons/${name}.svg`).default;
    return <IconComponent fill={color} className={className} width={size} height={size}  />;
  } catch (error) {
    console.error(`Icon '${name}' not found`);
    return null;
  }
};

