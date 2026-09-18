import { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [korisnik, setKorisnik] = useState(null);
  const [ucitavanje, setUcitavanje] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (trenutniKorisnik) => {
      setKorisnik(trenutniKorisnik);
      setUcitavanje(false);
    });

    return () => unsubscribe();
  }, []);

  const prijava = (email, lozinka) => {
    return signInWithEmailAndPassword(auth, email, lozinka);
  };

  const odjava = () => {
    return signOut(auth);
  };

  const value = {
    korisnik,
    jeTrener: !!korisnik,
    ucitavanje,
    prijava,
    odjava,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
