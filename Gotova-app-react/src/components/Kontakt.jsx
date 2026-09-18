import { useState } from "react";

function Kontakt() {
  const [podaci, setPodaci] = useState({
    imePrezime: "",
    email: "",
    poruka: "",
  });
  const [poslano, setPoslano] = useState(false);
  const [greska, setGreska] = useState("");

  function handlePromjena(e) {
    const { name, value } = e.target;
    setPodaci((prethodno) => ({ ...prethodno, [name]: value }));
  }

  function handlePosalji(e) {
    e.preventDefault();

    if (
      !podaci.imePrezime.trim() ||
      !podaci.email.trim() ||
      !podaci.poruka.trim()
    ) {
      setGreska("Molimo popuni sva polja.");
      setPoslano(false);
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(podaci.email)) {
      setGreska("Unesi ispravnu e-mail adresu.");
      setPoslano(false);
      return;
    }

    setGreska("");
    setPoslano(true);
    setPodaci({ imePrezime: "", email: "", poruka: "" });
  }

  return (
    <section id="kontakt">
      <h2>Kontakt</h2>
      <div className="forma">
        <form onSubmit={handlePosalji}>
          <label htmlFor="ime-prezime">Ime i Prezime:</label>
          <input
            type="text"
            id="ime-prezime"
            name="imePrezime"
            value={podaci.imePrezime}
            onChange={handlePromjena}
          />
          <label htmlFor="mail-adresa">Vaša e-mail adresa:</label>
          <input
            type="email"
            id="mail-adresa"
            name="email"
            value={podaci.email}
            onChange={handlePromjena}
          />
          <div className="poruka">
            <label htmlFor="poruka">Poruka:</label>
            <textarea
              id="poruka"
              name="poruka"
              value={podaci.poruka}
              onChange={handlePromjena}
            />
          </div>
          {greska && <p className="forma-greska">{greska}</p>}
          {poslano && (
            <p className="forma-uspjeh">
              Poruka je poslana. Javit ću se uskoro!
            </p>
          )}
          <input type="submit" value="Pošalji" />
        </form>
      </div>
    </section>
  );
}

export default Kontakt;
