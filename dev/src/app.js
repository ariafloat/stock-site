import getData from './get-data';
import { parserHtmlRaqualia, parserHtmlAskat, parserHtmlAratana, parserHtmlSyros } from './parser-html';

// const urls = ['http://www.raqualia.co.jp/', 'http://askat-inc.com/japanese/news/', 'http://www.aratana.com/news/', 'https://ir.syros.com/press-releases', 'https://ir.syros.com/ir-calendar'];
const urls = ['http://www.raqualia.co.jp/', 'http://askat-inc.com/japanese/news/', 'http://www.aratana.com/news/', 'https://ir.syros.com/press-releases'];

function dispInfo(data, insertId, loadingId) {
  let insertText = '';
  data.forEach((v) => {
    insertText += `<a href="${v.url}" target="_blank" rel="nofollow" class="list-group-item list-group-item-action">${v.date} - ${v.title}</a>`;
  });
  const deleteNode = document.getElementById(loadingId);
  deleteNode.parentNode.removeChild(deleteNode);
  document.getElementById(insertId).insertAdjacentHTML('afterend', insertText);
}

getData(urls)
  .then((data) => {
    const raqualia = parserHtmlRaqualia(data.url1);
    const askat = parserHtmlAskat(data.url2);
    const aratana = parserHtmlAratana(data.url3);
    // const syros = parserHtmlSyros(data.url4, data.url5);
    const syros = parserHtmlSyros(data.url4);
    dispInfo(raqualia.press, 'raqualia-press-top', 'raqualia-press-loading');
    dispInfo(raqualia.news, 'raqualia-news-top', 'raqualia-news-loading');
    dispInfo(askat, 'askat-top', 'askat-loading');
    dispInfo(aratana, 'aratana-top', 'aratana-loading');
    dispInfo(syros, 'syros-news-top', 'syros-news-loading');
    // dispInfo(syros.events, 'syros-events-top', 'syros-events-loading');
  });
