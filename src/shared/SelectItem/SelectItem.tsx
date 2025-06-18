interface SelectItemProps {
  imageSrc: string;
  title: string;
}

export const SelectItem: React.FC<SelectItemProps> = ({ imageSrc, title }) => {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <img src={imageSrc} style={{ width: 20 }} alt="pmr" />
      {title}
    </div>
  );
};
