import '@testing-library/jest-dom';
import { afterAll, afterEach, beforeAll } from 'vitest';
import { mswServer } from './mocks/mswServer';

beforeAll(() => mswServer.listen());
afterEach(() => mswServer.resetHandlers());
afterAll(() => mswServer.close());
