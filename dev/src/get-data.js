// Avoid unnecessary caching in IE browser
let headers = {};
const userAgent = window.navigator.userAgent.toLowerCase();
if (userAgent.indexOf('msie') !== -1 || userAgent.indexOf('trident') !== -1) {
  headers = { pragma: 'no-cache' };
}

export default async function getData(urls) {
  const enUrls = urls.map(url => encodeURIComponent(url));
  try {
    const res = await window.fetch(`https://ariafloat-dream.glitch.me/dreams?url1=${enUrls[0]}&url2=${enUrls[1]}&url3=${enUrls[2]}&url4=${enUrls[3]}&url5=${enUrls[4]}`, {
      headers,
    });
    const json = await res.json();
    return JSON.parse(json);
  } catch (err) {
    console.error(err);
    throw new Error(err);
  }
}
