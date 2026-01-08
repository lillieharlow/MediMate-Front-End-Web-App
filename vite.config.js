import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true, // enables Jest-like syntax in Vitest test files
    environment: 'jsdom', // tells the test runner system (Vitest, Jest) to be ready to run browser-related code
    setupFiles: 'src/setupTests.js', // Perform any additional configuration before any tests run
  },
});
