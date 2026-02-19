import logo from "../assets/logo.png";
import "./nav-bar.less";

export const NavBar: React.FC = () => {
  return (
    <nav className="navbar navbar-light bg-light">
      <a className="navbar-brand" href="#">
        <img src={logo} height="30" alt="" />
      </a>
    </nav>
  );
};
