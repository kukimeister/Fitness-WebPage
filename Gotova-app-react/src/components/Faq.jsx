import { useState } from "react";

const pitanja = [
  {
    pitanje: "Za koga je ovaj program namijenjen?",
    odgovor:
      "Za svakoga - bez obzira na razinu iskustva, dob ili trenutnu formu. Program se prilagođava tebi.",
  },
  {
    pitanje: "Trebam li teretanu ili mogu vježbati kod kuće?",
    odgovor:
      "Programi su primarno dizajnirani za teretanu, ali mogu se prilagoditi i za trening kod kuće s minimalnom opremom.",
  },
  {
    pitanje: "Koliko brzo ću vidjeti prve rezultate?",
    odgovor:
      "Većina klijenata primijeti prve promjene već nakon 3-4 tjedna, uz dosljedan trening i prehranu.",
  },
  {
    pitanje: "Kako funkcionira suradnja s trenerom?",
    odgovor:
      "Nakon prijave, dogovaramo uvodni razgovor gdje upoznajem tvoje ciljeve, raspored i mogućnosti. Zatim dobivaš personalizirani plan.",
  },
  {
    pitanje: "Koliko puta tjedno trebam trenirati?",
    odgovor:
      "Preporučujem 3-4 puta tjedno, ali program se može prilagoditi i na 2 ili 5 dana ovisno o tvojem rasporedu.",
  },
  {
    pitanje: "Je li uključena i prehrana ili samo trening?",
    odgovor:
      "Uključeno je oboje - plan treninga i tjedni plan prehrane prilagođen tvojim ciljevima i budgetu.",
  },
  {
    pitanje: "Mogu li se javiti ako imam pitanje između treninga?",
    odgovor:
      "Da, dostupan sam putem poruka svaki dan. Nijedna tvoja nedoumica neće ostati bez odgovora.",
  },
  {
    pitanje: "Postoji li mogućnost povrata novca?",
    odgovor:
      "Ako nisi zadovoljan nakon prvog tjedna, vraćamo ti novac bez pitanja.",
  },
  {
    pitanje: "Što ako propustim trening?",
    odgovor:
      "Ništa se ne dogodi - jednostavno nastavimo dalje. Program nije rigidan, prilagođavamo se stvarnom životu.",
  },
  {
    pitanje: "Kako se razlikuješ od ostalih trenera?",
    odgovor:
      "Svaki klijent dobiva 100% pažnje i plan napravljen specifično za njega - nikakvi generički programi.",
  },
];

function Faq() {
  const [otvorenIndex, setOtvorenIndex] = useState(null);

  function handleKlik(index) {
    setOtvorenIndex(otvorenIndex === index ? null : index);
  }

  return (
    <section id="faq">
      <div className="faq-kartice">
        <h2>FAQ</h2>
        <div className="kartice-fq">
          {pitanja.map((stavka, index) => (
            <div className="kartica-fq" key={stavka.pitanje}>
              <button className="fq-gumb" onClick={() => handleKlik(index)}>
                {stavka.pitanje}
              </button>
              <div
                className="fq-sadrzaj"
                style={{
                  maxHeight: otvorenIndex === index ? "200px" : "0px",
                }}
              >
                <div className="fq-odgovor">{stavka.odgovor}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Faq;
