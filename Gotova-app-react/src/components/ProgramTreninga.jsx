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
import VideoModal from "./VideoModal";

const DANI = [
  { id: "pon", naziv: "Pon" },
  { id: "uto", naziv: "Uto" },
  { id: "cet", naziv: "Čet" },
  { id: "pet", naziv: "Pet" },
];

const PRAZNA_VJEZBA = { naziv: "", setovi: "", video: "", dan: "pon" };

function ProgramTreninga() {
  const { jeTrener } = useAuth();

  const [vjezbe, setVjezbe] = useState([]);
  const [ucitavanje, setUcitavanje] = useState(true);

  const [aktivniDan, setAktivniDan] = useState("pon");
  const [pretraga, setPretraga] = useState("");
  const [videoModal, setVideoModal] = useState("");

  const [formaOtvorena, setFormaOtvorena] = useState(false);
  const [uredujeId, setUredujeId] = useState(null);
  const [forma, setForma] = useState(PRAZNA_VJEZBA);

  useEffect(() => {
    const q = query(collection(db, "vjezbe"), orderBy("dan"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setVjezbe(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
      setUcitavanje(false);
    });
    return () => unsubscribe();
  }, []);

  const vjezbeZaDan = vjezbe.filter(
    (v) =>
      v.dan === aktivniDan &&
      v.naziv.toLowerCase().includes(pretraga.toLowerCase()),
  );

  function handlePromjenaForme(e) {
    const { name, value } = e.target;
    setForma((prethodno) => ({ ...prethodno, [name]: value }));
  }

  async function handleSpremi(e) {
    e.preventDefault();
    if (!forma.naziv.trim() || !forma.setovi.trim()) return;

    if (uredujeId) {
      await updateDoc(doc(db, "vjezbe", uredujeId), forma);
    } else {
      await addDoc(collection(db, "vjezbe"), forma);
    }

    setForma(PRAZNA_VJEZBA);
    setUredujeId(null);
    setFormaOtvorena(false);
  }

  function handleUredi(vjezba) {
    setForma({
      naziv: vjezba.naziv,
      setovi: vjezba.setovi,
      video: vjezba.video,
      dan: vjezba.dan,
    });
    setUredujeId(vjezba.id);
    setFormaOtvorena(true);
  }

  async function handleObrisi(id) {
    await deleteDoc(doc(db, "vjezbe", id));
  }

  function handleNovaVjezba() {
    setForma({ ...PRAZNA_VJEZBA, dan: aktivniDan });
    setUredujeId(null);
    setFormaOtvorena(true);
  }

  return (
    <section id="program-treninga">
      <h2>Program Treninga</h2>

      <div className="pt-tabovi">
        {DANI.map((dan) => (
          <button
            key={dan.id}
            className={`pt-tab${aktivniDan === dan.id ? " aktivni" : ""}`}
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
          placeholder="Pretraži vježbe po nazivu..."
          value={pretraga}
          onChange={(e) => setPretraga(e.target.value)}
        />
      </div>

      <div className="pt-sadrzaj">
        <div className="pt-panel aktivni">
          {ucitavanje && <p className="ucitavanje-tekst">Učitavanje...</p>}
          {!ucitavanje && vjezbeZaDan.length === 0 && (
            <p className="ucitavanje-tekst">Nema vježbi za ovaj dan.</p>
          )}
          {vjezbeZaDan.map((vjezba) => (
            <div className="vjezba-red" key={vjezba.id}>
              <button
                className="vjezba"
                onClick={() => setVideoModal(vjezba.video)}
              >
                {vjezba.naziv}: {vjezba.setovi}
              </button>
              {jeTrener && (
                <div className="admin-akcije">
                  <button onClick={() => handleUredi(vjezba)}>Uredi</button>
                  <button onClick={() => handleObrisi(vjezba.id)}>
                    Obriši
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {jeTrener && (
        <div className="admin-panel">
          {!formaOtvorena ? (
            <button className="admin-dodaj-gumb" onClick={handleNovaVjezba}>
              + Dodaj vježbu
            </button>
          ) : (
            <form className="admin-forma" onSubmit={handleSpremi}>
              <select
                name="dan"
                value={forma.dan}
                onChange={handlePromjenaForme}
              >
                {DANI.map((dan) => (
                  <option key={dan.id} value={dan.id}>
                    {dan.naziv}
                  </option>
                ))}
              </select>
              <input
                type="text"
                name="naziv"
                placeholder="Naziv vježbe (npr. Bench press)"
                value={forma.naziv}
                onChange={handlePromjenaForme}
                required
              />
              <input
                type="text"
                name="setovi"
                placeholder="Setovi/ponavljanja (npr. 3x8)"
                value={forma.setovi}
                onChange={handlePromjenaForme}
                required
              />
              <input
                type="text"
                name="video"
                placeholder="YouTube embed link"
                value={forma.video}
                onChange={handlePromjenaForme}
              />
              <div className="admin-forma-gumbi">
                <button type="submit">
                  {uredujeId ? "Spremi izmjene" : "Dodaj"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setFormaOtvorena(false);
                    setUredujeId(null);
                    setForma(PRAZNA_VJEZBA);
                  }}
                >
                  Odustani
                </button>
              </div>
            </form>
          )}
        </div>
      )}

      <VideoModal videoUrl={videoModal} onClose={() => setVideoModal("")} />
    </section>
  );
}

export default ProgramTreninga;
