const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  video: true,                     // ✅ video kaydını açar
  screenshotOnRunFailure: true,    // ✅ hata olunca screenshot kaydeder
  videosFolder: "cypress/videos",  // ✅ videoların kaydedileceği klasör
  screenshotsFolder: "cypress/screenshots", // ✅ screenshot klasörü
});
