const { defineConfig } = require("cypress");
const { readExcelFile } = require('./cypress/support/helper');


module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on('task', {
        readExcel(filePath) {

          return readExcelFile(filePath);
         
        }
      });
      return config; // <-- ESTE RETURN É FUNDAMENTAL
    },
    
    experimentalStudio: true,
    video: true
    // -- Set the default command timeout to 15 seconds
    // defaultCommandTimeout: 15000
  },
});
