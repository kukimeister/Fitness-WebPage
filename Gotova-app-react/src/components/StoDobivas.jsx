const stavke = [
  {
    ikona: "💪",
    naslov: "Personalizirani plan treninga",
    opis: "Plan treninga baziran na tvojem svakodnevnom životu i vremenu.",
  },
  {
    ikona: "🎥",
    naslov: "Video upute za vježbe",
    opis: "Svaka vježba će imati video za sebe kako bi vidli kako se izvodi ta vježba.",
  },
  {
    ikona: "🍽️",
    naslov: "Tjedni plan prehrane",
    opis: "Plan prehrane baziran na tvom budgetu i ukusu.",
  },
  {
    ikona: "📊",
    naslov: "Praćenje napretka i podrška",
    opis: "Zajedno sa vama ću pratiti vaš napredak i davati vam podršku za štogod vam je potrebno.",
  },
  {
    ikona: "👥",
    naslov: "Pristup privatnoj zajednici",
    opis: "U ovoj zajednici moći će te komunicirati sa svim ljudima koji su također u treningu kod mene, tako i sa mnom.",
  },
];

function StoDobivas() {
  return (
    <section id="sto-dobivas">
      <div className="sto-dobivas-kartice">
        <h2>Što dobivaš?</h2>
        <div className="kartice">
          {stavke.map((stavka) => (
            <div className="kartica" key={stavka.naslov}>
              <div className="kartica-ikona">{stavka.ikona}</div>
              <div className="kartica-tekst">
                <h3>{stavka.naslov}</h3>
                <p>{stavka.opis}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default StoDobivas;
