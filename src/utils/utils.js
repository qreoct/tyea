// Gleaned from https://github.com/kormyen/memex/blob/master/logic/view/util.js
// Source: https://stackoverflow.com/questions/8498592/extract-hostname-name-from-string

const extractHostname = (url) =>
  {
    let hostname;
    // find & remove protocol (http, ftp, etc.) and get hostname

    if (url.indexOf("://") > -1)
    {
      hostname = url.split('/')[2];
    }
    else
    {
      hostname = url.split('/')[0];
    }

    // find & remove port number
    hostname = hostname.split(':')[0];
    // find & remove "?"
    hostname = hostname.split('?')[0];

    return hostname;
}

const extractRootDomain = (url) =>
  {
    let domain = extractHostname(url),
    splitArr = domain.split('.'),
    arrLen = splitArr.length;

    // extracting the root domain here
    // if there is a subdomain 
    if (arrLen > 2) 
    {
      domain = splitArr[arrLen - 2] + '.' + splitArr[arrLen - 1];
      // check to see if it's using a Country Code Top Level Domain (ccTLD) (i.e. ".me.uk")
      if (splitArr[arrLen - 2].length === 2 && splitArr[arrLen - 1].length === 2)
      {
        // this is using a ccTLD
        domain = splitArr[arrLen - 3] + '.' + domain;
      }
    }
    return domain;
}

// Gleaned from https://github.com/jessekorzan/masonry-css-js
const reorder = (arr, columns) => {
  const cols = columns;
  const out = [];
  let col = 0;
  while(col < cols) {
      for(let i = 0; i < arr.length; i += cols) {
          let _val = arr[i + col];
          if (_val !== undefined)
              out.push(_val);
      }
      col++;
  }
  return out
}

// Gleaned from https://stackoverflow.com/a/25821576
const urlify = (text) => {
  var urlRegex = /(((https?:\/\/)|(www\.))[^\s]+)/g;

  return text.replace(urlRegex, function(url,b,c) {
      var url2 = (c === 'www.') ? 'http://' + url : url;
      if (url2.slice(-1) === "." || url2.slice(-1) === "!" || url2.slice(-1) === "?" || url2.slice(-1) === ",") {
        url2 = url2.slice(0, -1); // remove trailing punctuation
      }
      return '<a href="' + url2 + '" target="_blank">' + url + '</a>';
  }) 
}

export default { extractHostname, extractRootDomain, reorder, urlify }