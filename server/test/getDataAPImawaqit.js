const puppeteer = require("puppeteer");
(async function() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  let dataOfMosqueInCity;

  await page.goto("https://mawaqit.net");

  const getDataAPImawaqit = await page.evaluate(() => {
    return fetch(`https://mawaqit.net/api/2.0/mosque/search?word=Tourcoing`)
    .then((Response) => Response.json())
    .then((obj) => obj)
    .then((obj) => {
      let arr = [];
      for (let element of obj) {
        arr.push(element);
      }
      return arr;
    })
    .then((arr) => arr)
    .then((dataArray) =>
    dataArray.map((data) => {
      return {
        mosque: {
          name : data.name,
          localisation : data.localisation,
        },
        salat: {
          fajr: data.times[0],
          shourouk: data.times[1],
          dhor: data.times[2],
          asr: data.times[3],
          maghreb: data.times[4],
          icha: data.times[5],
        },
        jumua : {
            vendredi : data.jumua
        }
      };
    })
  );
  
  });
  dataOfMosqueInCity = getDataAPImawaqit;

  await browser.close();

  console.log(dataOfMosqueInCity);

})();


