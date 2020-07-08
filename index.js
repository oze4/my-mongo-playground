require('dotenv').config();

const initStackOverflowDemo = require('./src/stackOverflow');

(async () => {
  try {
    // Run demos/POC's/tests from here
    await initStackOverflowDemo();

    console.log("\r\n\r\nDone!\r\n");
  } catch (err) {
    console.trace(err)
  }
})();
