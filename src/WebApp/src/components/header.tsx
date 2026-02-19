import "./header.less";

interface HeaderProps {
  title: string;
}

export const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <header className="streaming-text__header">
      <h1>{title}</h1>
    </header>
  );
};
