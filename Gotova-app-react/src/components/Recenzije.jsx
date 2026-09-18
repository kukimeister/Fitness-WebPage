import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";

const PRAZNA_RECENZIJA = { ime: "", ocjena: 5, citat: "", slika: "" };

function Recenzije() {
  const { jeTrener } = useAuth();

  const [recenzije, setRecenzije] = useState([]);
  const [ucitavanje, setUcitavanje] = useState(true);

  const [pretraga, setPretraga] = useState("");
  const [filterOcjena, setFilterOcjena] = useState("sve");

  const [formaOtvorena, setFormaOtvorena] = useState(false);
  const [uredujeId, setUredujeId] = useState(null);
  const [forma, setForma] = useState(PRAZNA_RECENZIJA);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "recenzije"), (snapshot) => {
      setRecenzije(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
      setUcitavanje(false);
    });
    return () => unsubscribe();
  }, []);

  const filtrirane = recenzije.filter((r) => {
    const odgovaraPretrazi = r.ime.toLowerCase().includes(pretraga.toLowerCase());
    const odgovaraOcjeni =
      filterOcjena === "sve" || Number(r.ocjena) === Number(filterOcjena);
    return odgovaraPretrazi && odgovaraOcjeni;
  });

  function handlePromjenaForme(e) {
    const { name, value } = e.target;
    setForma((prethodno) => ({ ...prethodno, [name]: value }));
  }

  async function handleSpremi(e) {
    e.preventDefault();
    if (!forma.ime.trim() || !forma.citat.trim()) return;

    const podaci = { ...forma, ocjena: Number(forma.ocjena) };

    if (uredujeId) {
      await updateDoc(doc(db, "recenzije", uredujeId), podaci);
    } else {
      await addDoc(collection(db, "recenzije"), podaci);
    }

    setForma(PRAZNA_RECENZIJA);
    setUredujeId(null);
    setFormaOtvorena(false);
  }

  function handleUredi(recenzija) {
    setForma({
      ime: recenzija.ime,
      ocjena: recenzija.ocjena,
      citat: recenzija.citat,
      slika: recenzija.slika || "",
    });
    setUredujeId(recenzija.id);
    setFormaOtvorena(true);
  }

  async function handleObrisi(id) {
    await deleteDoc(doc(db, "recenzije", id));
  }

  return (
    <section id="recenzije">
      <h2>Recenzije</h2>

      <div className="pretraga-wrap">
        <input
          type="text"
          className="pretraga-input"
          placeholder="Pretraži po imenu..."
          value={pretraga}
          onChange={(e) => setPretraga(e.target.value)}
        />
        <select value={filterOcjena} onChange={(e) => setFilterOcjena(e.target.value)}>
          <option value="sve">Sve ocjene</option>
          <option value="5">5 zvjezdica</option>
          <option value="4">4 zvjezdice</option>
          <option value="3">3 zvjezdice</option>
          <option value="2">2 zvjezdice</option>
          <option value="1">1 zvjezdica</option>
        </select>
      </div>

      <div className="kartice-rc">
        {ucitavanje && <p className="ucitavanje-tekst">Učitavanje...</p>}
        {!ucitavanje && filtrirane.length === 0 && (
          <p className="ucitavanje-tekst">Nema recenzija koje odgovaraju pretrazi.</p>
        )}
        {filtrirane.map((recenzija) => (
          <div className="kartica-rc" key={recenzija.id}>
            {recenzija.slika && <img src={recenzija.slika} alt={recenzija.ime} />}
            <p className="zvjezdice">{"⭐".repeat(recenzija.ocjena)}</p>
            <p className="citat">" {recenzija.citat} "</p>
            <p className="ime">— {recenzija.ime}</p>
            {jeTrener && (
              <div className="admin-akcije">
                <button onClick={() => handleUredi(recenzija)}>Uredi</button>
                <button onClick={() => handleObrisi(recenzija.id)}>Obriši</button>
              </div>
            )}
          </div>
        ))}
      </div>

      {jeTrener && (
        <div className="admin-panel">
          {!formaOtvorena ? (
            <button
              className="admin-dodaj-gumb"
              onClick={() => {
                setForma(PRAZNA_RECENZIJA);
                setUredujeId(null);
                setFormaOtvorena(true);
              }}
            >
              + Dodaj recenziju
            </button>
          ) : (
            <form className="admin-forma" onSubmit={handleSpremi}>
              <input
                type="text"
                name="ime"
                placeholder="Ime i prezime"
                value={forma.ime}
                onChange={handlePromjenaForme}
                required
              />
              <select name="ocjena" value={forma.ocjena} onChange={handlePromjenaForme}>
                {[5, 4, 3, 2, 1].map((broj) => (
                  <option key={broj} value={broj}>
                    {broj} zvjezdica
                  </option>
                ))}
              </select>
              <input
                type="text"
                name="citat"
                placeholder="Tekst recenzije"
                value={forma.citat}
                onChange={handlePromjenaForme}
                required
              />
              <input
                type="text"
                name="slika"
                placeholder="Link na sliku (opcionalno)"
                value={forma.slika}
                onChange={handlePromjenaForme}
              />
              <div className="admin-forma-gumbi">
                <button type="submit">{uredujeId ? "Spremi izmjene" : "Dodaj"}</button>
                <button
                  type="button"
                  onClick={() => {
                    setFormaOtvorena(false);
                    setUredujeId(null);
                    setForma(PRAZNA_RECENZIJA);
                  }}
                >
                  Odustani
                </button>
              </div>
            </form>
          )}
        </div>
      )}
    </section>
  );
}

export default Recenzije;
