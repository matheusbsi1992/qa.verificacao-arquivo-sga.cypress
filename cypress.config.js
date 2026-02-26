const { defineConfig } = require("cypress");
const { readPDF } = require('./cypress/support/helper');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {

      on('task', {
        readPDF(pathToPdf) {
          return readPDF(pathToPdf);
        }
      });

      return config; // <-- ESTE RETURN É FUNDAMENTAL
    },

    experimentalStudio: true,
    video: true
  },
});
