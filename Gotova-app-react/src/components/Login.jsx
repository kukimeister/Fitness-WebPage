import { useState } from "react";
import { useAuth } from "../context/AuthContext";

function Login() {
  const { korisnik, jeTrener, prijava, odjava } = useAuth();
  const [email, setEmail] = useState("");
  const [lozinka, setLozinka] = useState("");
  const [greska, setGreska] = useState("");
  const [otvoreno, setOtvoreno] = useState(false);

  async function handlePrijava(e) {
    e.preventDefault();
    setGreska("");
    try {
      await prijava(email, lozinka);
      setOtvoreno(false);
      setEmail("");
      setLozinka("");
    } catch {
      setGreska("Pogrešan email ili lozinka.");
    }
  }

  if (jeTrener) {
    return (
      <div className="trener-login">
        <span className="trener-oznaka">Trener: {korisnik.email}</span>
        <button className="trener-gumb" onClick={odjava}>
          Odjava
        </button>
      </div>
    );
  }

  return (
    <div className="trener-login">
      {!otvoreno ? (
        <button className="trener-gumb" onClick={() => setOtvoreno(true)}>
          Prijava za trenera
        </button>
      ) : (
        <form className="trener-forma" onSubmit={handlePrijava}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Lozinka"
            value={lozinka}
            onChange={(e) => setLozinka(e.target.value)}
            required
          />
          <button type="submit" className="trener-gumb">
            Prijavi se
          </button>
          <button
            type="button"
            className="trener-gumb trener-gumb-otkazi"
            onClick={() => setOtvoreno(false)}
          >
            Odustani
          </button>
          {greska && <p className="trener-greska">{greska}</p>}
        </form>
      )}
    </div>
  );
}

export default Login;
