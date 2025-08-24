const fs = require('fs');

const data = JSON.parse(fs.readFileSync('seg.json', 'utf-8'));

const output = data
  .map((item) => {
    const code = item.Code;
    const name = item.Name;

    return `.sfl-${name.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()}::after { content: "\\${code}"; }`;
  })
  .join('\n');

console.log(output);

const searchData = data
  .map((item) => {
    const name = item.Name;
    const tags = item.Tags;

    return {
      [name]: tags,
    };
  })
  .reduce((acc, curr) => {
    return { ...acc, ...curr };
  }, {});

fs.writeFileSync('searchdata.json', JSON.stringify(searchData, null, 2), 'utf-8');
