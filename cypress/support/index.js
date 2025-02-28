import { addMatchImageSnapshotCommand } from 'cypress-image-snapshot/command';
import { configure } from '@cypress/globals';

configure({
  // Add your custom configuration here
  // ...
  fileExplorer: {
    exclude: ['**/node_modules/**/*'],
  },
  fixturesFolder: 'cypress/fixtures',
  integrationFolder: 'cypress/e2e',
  screenshotsFolder: 'cypress/screenshots',
  videosFolder: 'cypress/videos',
  // Update the specPattern to include .spec. files
  specPattern: 'cypress/e2e/**/*.spec.{js,jsx,ts,tsx}',
});

addMatchImageSnapshotCommand();