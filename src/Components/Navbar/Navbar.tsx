import "./Navbar.scss";

function Navbar() {
  return (
    <div className="Navbar">
      <div className="logo"><a href="/">Hotel Automation</a></div>
      <ul className="navbar-links">
        <li><a href="/reservations">Reservations</a></li>
      </ul>
    </div>
  );
}

export default Navbar;
