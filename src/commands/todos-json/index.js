const fs = require('fs');
const jsonData = require('./todos.json');

const testFn = (jsonData) => {
  const newData = jsonData.map((datum) => ({
    title: datum.title,
    description: datum.description,
  }));
  fs.writeFileSync('./todos.json', JSON.stringify(newData));
};

testFn(jsonData);
