import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";

const DANI = [
  { id: "pon", naziv: "Pon" },
  { id: "uto", naziv: "Uto" },
  { id: "sri", naziv: "Sri" },
  { id: "cet", naziv: "Čet" },
  { id: "pet", naziv: "Pet" },
  { id: "sub", naziv: "Sub" },
  { id: "ned", naziv: "Ned" },
];

const TIPOVI = ["Doručak", "Ručak", "Užina", "Večera"];

const PRAZAN_OBROK = { dan: "pon", tip: "Doručak", opis: "", kalorije: "" };

function PlanPrehrane() {
  const { jeTrener } = useAuth();

  const [obroci, setObroci] = useState([]);
  const [ucitavanje, setUcitavanje] = useState(true);

  const [aktivniDan, setAktivniDan] = useState("pon");
  const [pretraga, setPretraga] = useState("");

  const [formaOtvorena, setFormaOtvorena] = useState(false);
  const [uredujeId, setUredujeId] = useState(null);
  const [forma, setForma] = useState(PRAZAN_OBROK);

  useEffect(() => {
    const q = query(collection(db, "obroci"), orderBy("dan"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setObroci(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
      setUcitavanje(false);
    });
    return () => unsubscribe();
  }, []);

  const obrociZaDan = obroci.filter(
    (o) =>
      o.dan === aktivniDan &&
      (o.opis.toLowerCase().includes(pretraga.toLowerCase()) ||
        o.tip.toLowerCase().includes(pretraga.toLowerCase()))
  );

  function handlePromjenaForme(e) {
    const { name, value } = e.target;
    setForma((prethodno) => ({ ...prethodno, [name]: value }));
  }

  async function handleSpremi(e) {
    e.preventDefault();
    if (!forma.opis.trim()) return;

    const podaci = { ...forma, kalorije: Number(forma.kalorije) || 0 };

    if (uredujeId) {
      await updateDoc(doc(db, "obroci", uredujeId), podaci);
    } else {
      await addDoc(collection(db, "obroci"), podaci);
    }

    setForma(PRAZAN_OBROK);
    setUredujeId(null);
    setFormaOtvorena(false);
  }

  function handleUredi(obrok) {
    setForma({
      dan: obrok.dan,
      tip: obrok.tip,
      opis: obrok.opis,
      kalorije: obrok.kalorije,
    });
    setUredujeId(obrok.id);
    setFormaOtvorena(true);
  }

  async function handleObrisi(id) {
    await deleteDoc(doc(db, "obroci", id));
  }

  function handleNoviObrok() {
    setForma({ ...PRAZAN_OBROK, dan: aktivniDan });
    setUredujeId(null);
    setFormaOtvorena(true);
  }

  return (
    <section id="plan-prehrane">
      <h2>Plan Prehrane</h2>

      <div className="pp-tabovi">
        {DANI.map((dan) => (
          <button
            key={dan.id}
            className={`pp-tab${aktivniDan === dan.id ? " aktivni" : ""}`}
            onClick={() => setAktivniDan(dan.id)}
          >
            {dan.naziv}
          </button>
        ))}
      </div>

      <div className="pretraga-wrap">
        <input
          type="text"
          className="pretraga-input"
          placeholder="Pretraži obroke (npr. piletina, doručak)..."
          value={pretraga}
          onChange={(e) => setPretraga(e.target.value)}
        />
      </div>

      <div className="pp-sadrzaj">
        <div className="pp-panel aktivni">
          {ucitavanje && <p className="ucitavanje-tekst">Učitavanje...</p>}
          {!ucitavanje && obrociZaDan.length === 0 && (
            <p className="ucitavanje-tekst">Nema obroka za ovaj dan.</p>
          )}
          <dl>
            {obrociZaDan.map((obrok) => (
              <div className="obrok-red" key={obrok.id}>
                <dt>{obrok.tip}:</dt>
                <dd>
                  {obrok.opis} ({obrok.kalorije} kcal)
                </dd>
                {jeTrener && (
                  <div className="admin-akcije">
                    <button onClick={() => handleUredi(obrok)}>Uredi</button>
                    <button onClick={() => handleObrisi(obrok.id)}>Obriši</button>
                  </div>
                )}
              </div>
            ))}
          </dl>
        </div>
      </div>

      {jeTrener && (
        <div className="admin-panel">
          {!formaOtvorena ? (
            <button className="admin-dodaj-gumb" onClick={handleNoviObrok}>
              + Dodaj obrok
            </button>
          ) : (
            <form className="admin-forma" onSubmit={handleSpremi}>
              <select name="dan" value={forma.dan} onChange={handlePromjenaForme}>
                {DANI.map((dan) => (
                  <option key={dan.id} value={dan.id}>
                    {dan.naziv}
                  </option>
                ))}
              </select>
              <select name="tip" value={forma.tip} onChange={handlePromjenaForme}>
                {TIPOVI.map((tip) => (
                  <option key={tip} value={tip}>
                    {tip}
                  </option>
                ))}
              </select>
              <input
                type="text"
                name="opis"
                placeholder="Opis obroka"
                value={forma.opis}
                onChange={handlePromjenaForme}
                required
              />
              <input
                type="number"
                name="kalorije"
                placeholder="Kalorije"
                value={forma.kalorije}
                onChange={handlePromjenaForme}
              />
              <div className="admin-forma-gumbi">
                <button type="submit">{uredujeId ? "Spremi izmjene" : "Dodaj"}</button>
                <button
                  type="button"
                  onClick={() => {
                    setFormaOtvorena(false);
                    setUredujeId(null);
                    setForma(PRAZAN_OBROK);
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

export default PlanPrehrane;
