function newElements(type, attrs = {}) {
  const element = document.createElement(type);
  for (let attr in attrs) {
    const value = attrs[attr];
    if (attr == "innerText") {
      element.innerText = value;
    } else {
      element.setAttribute(attr, value);
    }
  }
  return element;
}

//code qui fonctionne

async function loadCitys() {
  const res = await fetch("http://localhost:3000/mosques");
  const mosques = await res.json();
  const container = document.querySelector(".container");
  const card = newElements("div", { class: "card" });
  container.appendChild(card);

  console.log(mosques);

  for (let elements of mosques) {
    for (element of elements) {
      console.log(element.mosque);
      console.log(element.salat);
      console.log(element.jumua);
      const title = newElements("h4", { innerText: 'nom de mosquée : ' + element.mosque.name });
      const localisation = newElements("h5", { innerText: 'Localisation : ' + element.mosque.localisation });
      const horaires = newElements("ul", {});
      const fajr = newElements("li", { innerText: 'fajr : ' + element.salat.fajr });
      const shourouk = newElements("li", { innerText: 'shourouk : ' + element.salat.shourouk });
      const dhor = newElements("li", { innerText: 'dhor : ' + element.salat.dhor });
      const asr = newElements("li", { innerText: 'asr : ' + element.salat.asr });
      const maghreb = newElements("li", { innerText: 'maghreb : ' + element.salat.maghreb });
      const icha = newElements("li", { innerText: 'icha : ' + element.salat.icha });

      if (element.jumua.vendredi == null) {

        const jumua = newElements("li", { innerText: 'jumu3a : ' + 'pas de jumua' });

        card.appendChild(title);
        card.appendChild(localisation);
        card.appendChild(horaires);
        horaires.appendChild(fajr);
        horaires.appendChild(shourouk);
        horaires.appendChild(dhor);
        horaires.appendChild(asr);
        horaires.appendChild(maghreb);
        horaires.appendChild(icha);
        horaires.appendChild(jumua);
      } else {

        const jumua = newElements("li", { innerText: 'jumu3a : ' + element.jumua.vendredi });

        card.appendChild(title);
        card.appendChild(localisation);
        card.appendChild(horaires);
        horaires.appendChild(fajr);
        horaires.appendChild(shourouk);
        horaires.appendChild(dhor);
        horaires.appendChild(asr);
        horaires.appendChild(maghreb);
        horaires.appendChild(icha);
        horaires.appendChild(jumua);
      }


    }
  }

  /*
  mosques.forEach((mosques)=>{
    const card = newElements("div", { class: "card" });
    const title = newElements("h4", { innerText: mosques.mosque.name });
    const horaires = newElements("ul", {});
    const fajr = newElements("li", {innerText: mosques.salat.fajr });

    card.appendChild(title);
    card.appendChild(horaires);
    horaires.appendChild(fajr);
*/
}
/*
  mosques.forEach((mosque) => {
    const card = newElements("div", { class: "card" });
    const title = newElements("h4", { innerText: mosque.name });
    const description = newElements("p", { innerText: mosque.description });
    const horaires = newElements("ul", {});
    const fajr = newElements("li", {innerText: mosque.horaires.fajr });
    const shourouk = newElements("li", {innerText: mosque.horaires.shourouk });
    const dhor = newElements("li", {innerText: mosque.horaires.dhor });
    const asr = newElements("li", {innerText: mosque.horaires.asr });
    const maghreb = newElements("li", {innerText: mosque.horaires.maghreb });
    const icha = newElements("li", {innerText: mosque.horaires.icha });

    //const img = newElements("img", { src: creator.img });
    // img.style.width = "100px";
    card.appendChild(title);
    card.appendChild(description);
    card.appendChild(horaires);
    horaires.appendChild(fajr);
    horaires.appendChild(shourouk);
    horaires.appendChild(dhor);
    horaires.appendChild(asr);
    horaires.appendChild(maghreb);
    horaires.appendChild(icha);

    //   card.appendChild(img);
    container.appendChild(card);
  });
  */
/*
  console.log(mosques)

}
*/
//loadCitys();

let submitBtn = document.querySelector("#getMosqueOfCitys");
let city = "";
let cityInput = document.querySelector(".city-input").value;
let lastInput = cityInput;


async function submitChannel(cityArg) {
  let cityInputClient = cityArg;
  fetch("http://localhost:3000/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ cityInputClient }),
  });
  console.log(cityInputClient)
}
submitBtn.addEventListener("click", function () {
  // e.preventDefault();
  submitChannel(document.querySelector(".city-input").value);
  document.querySelector(".container").innerHTML = "";
  setTimeout(() => {
    loadCitys();
    document.querySelector(".city-input").value = "";
  }, 1000);

});