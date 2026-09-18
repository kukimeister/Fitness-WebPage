# Marko Markić - Personalni trener (React + Firebase verzija)

React verzija prototipa iz `frend-course-projekt-stranica` repozitorija, koju sam proširio
prema smjernicama za završni rad (React hooks, Firebase Firestore CRUD,
Firebase Auth).

## Pokretanje

```bash
npm install
npm run dev
```

## Kako radi CRUD

Nakon prijave kao trener (gumb "Prijava za trenera" u navigaciji),
u sekcijama **Program Treninga**, **Plan Prehrane** i **Recenzije** pojavljuje
se admin panel s gumbom "+ Dodaj..." te gumbima "Uredi"/"Obriši" uz svaku
stavku. Svi podaci se spremaju u Firestore kolekcije `vjezbe`, `obroci` i
`recenzije`.

Baza je prazna dok se ne dodaju prvi podatci - to namjerno demonstrira CRUD
(dodavanje) uživo. Dodavanje vježbe/obroke/recenzije je napravljeno
ručno kroz formu kako bi treneru olakšao i dao kontrolu nad sadržajem na stranici

## Struktura

- `src/firebase.js` - inicijalizacija Firebase-a (Auth + Firestore)
- `src/context/AuthContext.jsx` - React context koji prati je li trener
  prijavljen (useState + useEffect + onAuthStateChanged)
- `src/components/` - sve komponente stranice; `ProgramTreninga.jsx`,
  `PlanPrehrane.jsx` i `Recenzije.jsx` sadrže puni CRUD (useState, useEffect,
  onSnapshot, addDoc/updateDoc/deleteDoc) + pretragu/filtriranje
