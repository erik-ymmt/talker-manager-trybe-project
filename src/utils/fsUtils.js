const fs = require('fs/promises');

const readFile = async () => {
  try {
    const read = await fs.readFile('./src/talker.json');
    const talkers = JSON.parse(read);
    return talkers;
  } catch (error) {
    console.log('error: could not read the file');
  }
};

const writeFile = async (content) => {
  try {
    const cotnentToWrite = JSON.stringify(content);
    fs.writeFile('./src/talker.json', cotnentToWrite);
  } catch (error) {
    console.log('error: could not write the file');
  }
};

module.exports = { readFile, writeFile };
