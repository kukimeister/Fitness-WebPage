"use strict";

// LOGIKA ZA PLAN PREHRANE 

const tabovi = document.querySelectorAll(`.pp-tab`);
const paneli = document.querySelectorAll(`.pp-panel`);

tabovi.forEach(function (tab) {
  tab.addEventListener("click", function () {
tabovi.forEach(function (t) { t.classList.remove("aktivni"); });
paneli.forEach(function (p) { p.classList.remove("aktivni"); });

tab.classList.add("aktivni");
const danId = tab.dataset.dan;

document.getElementById(danId).classList.add("aktivni");

  });
});



// LOGIKA ZA PLAN PROGRAMA TRENINGA

const ptTabovi = document.querySelectorAll('.pt-tab');
const ptPaneli = document.querySelectorAll('.pt-panel');

ptTabovi.forEach(function(tab) {
  tab.addEventListener('click', function() {
    ptTabovi.forEach(function(t) { t.classList.remove('aktivni'); });
    ptPaneli.forEach(function(p) { p.classList.remove('aktivni'); });

    tab.classList.add('aktivni');

    const danId = tab.dataset.dan;
    document.getElementById(danId).classList.add('aktivni');
  });
});



// LOGIKA ZA KLIK NA VJEŽBU SA VIDEO POP UP-OM

// 1. DOHVATITI SVE ELEMENTE

const modal = document.getElementById(`modal`);
const modalVideo = document.getElementById(`modal-video`);
const modalZatvori = document.getElementById(`modal-zatvori`);
const vjezbe = document.querySelectorAll(`.vjezba`);

// 2. KLIK NA VJEŽBU DA SE PRIKAŽE MODAL

vjezbe.forEach(function (vjezba) {
  vjezba.addEventListener("click", function () {
    const videoLink = vjezba.dataset.video;
    modalVideo.src = videoLink;
    modal.style.display = "flex";
  });
});

// 3. KLIK NA X GUMB DA SE SAKRIJE MODAL I OČISTI IFRAME SRC
modalZatvori.addEventListener("click", function () {
  modal.style.display = "none";
  modalVideo.src = "";
});

// 4. KLIK IZVAN MODALA I DA SE ISTO DESI KAO I U 3.

modal.addEventListener("click", function (e) {
  if (e.target === modal) {
    modal.style.display = "none";
    modalVideo.src = "";
  }
});

// LOGIKA ZA FAQ DROPDOWNOVE

const gumbiFaq = document.querySelectorAll(`.fq-gumb`);

gumbiFaq.forEach(function (gumb) {
  gumb.addEventListener("click", function () {
    const sadrzaj = gumb.nextElementSibling;
    const bioOtvoren =
      sadrzaj.style.maxHeight !== "" && sadrzaj.style.maxHeight !== null;
    sadrzaj.style.maxHeight !== "0px";

    document.querySelectorAll(`.fq-sadrzaj`).forEach(function (s) {
      s.style.maxHeight = null;
    });

    if (!bioOtvoren) {
      sadrzaj.style.maxHeight = sadrzaj.scrollHeight + 60 + "px";
    }
  });
});
