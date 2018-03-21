import cheerio from 'cheerio';

export function parserHtmlRaqualia(data) {
  function twoParse($c, div, topUrl) {
    const result = [];
    const dt = $c(div).find('dt');
    const dd = $c(div).find('dd');
    for (let i = 0; i < 5; i += 1) {
      result.push({
        date: $c(dt[i]).text(),
        title: $c(dd[i])[0].children[1].children[0].data,
        url: `${topUrl}${$c(dd[i])[0].children[1].attribs.href}`,
      });
    }
    return result;
  }
  const $c = cheerio.load(data);
  const div = $c("div[class='box']");
  return { press: twoParse($c, div[0], ''), news: twoParse($c, div[1], 'http://www.raqualia.co.jp/') };
}

export function parserHtmlAskat(data) {
  const result = [];
  const $c = cheerio.load(data);
  const li = $c("ul[class='news stripe'] li");
  for (let i = 0; i < li.length; i += 1) {
    result.push({
      date: li[i].children[1].children[1].children[1].children[0].data,
      title: li[i].children[1].children[3].children[1].children[1].children[1].children[0].data,
      url: li[i].children[1].children[3].children[1].attribs.href,
    });
    if (i >= 4) break;
  }
  return result;
}

export function parserHtmlAratana(data) {
  const result = [];
  const $c = cheerio.load(data);
  const header = $c("div[class='news-blocks'] header[class=entry-header]");
  for (let i = 0; i < header.length; i += 1) {
    result.push({
      date: header[i].children[2].children[1].children[0].data,
      title: header[i].children[1].children[0].children[0].data,
      url: header[i].children[1].children[0].attribs.href,
    });
    if (i >= 4) break;
  }
  return result;
}

export function parserHtmlSyros(dataNews, dataEvents) {
  const resulNews = [];
  const resulEvents = [];
  const $cn = cheerio.load(dataNews);
  const $ce = cheerio.load(dataEvents);
  const divNews = $cn("div[class='media-body']");
  const divEvents = $ce("div[class='media-body']");

  for (let i = 0; i < divNews.length; i += 1) {
    resulNews.push({
      date: divNews[i].children[1].children[0].children[0].data,
      title: divNews[i].children[3].children[1].children[0].data,
      url: divNews[i].children[3].children[1].attribs.href,
    });
    if (i >= 4) break;
  }

  for (let i = 0; i < divEvents.length; i += 1) {
    resulEvents.push({
      date: divEvents[i].children[1].children[0].data,
      title: divEvents[i].children[4].children[0].children[0].data,
      url: divEvents[i].children[4].children[0].attribs.href,
    });
    if (i >= 4) break;
  }

  return { news: resulNews, events: resulEvents };
}
