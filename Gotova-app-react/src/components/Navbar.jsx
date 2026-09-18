import Login from "./Login";

function Navbar() {
  return (
    <nav>
      <div className="nav-logo">
        <a href="#">Marko Markić</a>
      </div>
      <ul className="nav-linkovi">
        <li>
          <a href="#o-meni">O meni</a>
        </li>
        <li>
          <a href="#sto-dobivas">Što dobivaš</a>
        </li>
        <li>
          <a href="#program-treninga">Program Treninga</a>
        </li>
        <li>
          <a href="#plan-prehrane">Plan Prehrane</a>
        </li>
        <li>
          <a href="#faq">FAQ</a>
        </li>
        <li>
          <a href="#recenzije">Recenzije</a>
        </li>
        <li>
          <a href="#kontakt">Kontakt</a>
        </li>
      </ul>
      <Login />
    </nav>
  );
}

export default Navbar;
