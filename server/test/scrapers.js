const puppeteer = require('puppeteer');

async function scrapeChannel(url){

    const browser = await puppeteer.lauch();
    const page = await browser.newPage();
    await page.goto(url);

    const[el] = await page.$x('//*[@id="text"]');
    const text = await el.getProperty('textContent');
    const name = await text.jsonValue();

    const [el2] = await page.$x('//*[@id="img"]');
    const src = await el2.getProperty('src');
    const avatarURL = await src.jsonValue();

    browser.close();

    console.log({name, avatarURL});

    return {name, avatarURL};

}

scrapeChannel('https://www.youtube.com/channel/UCRLEADhMcb8WUdnQ5_Alk7g');