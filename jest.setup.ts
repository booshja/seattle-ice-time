import '@testing-library/jest-dom';
import 'jest-styled-components';
import { randomUUID } from 'crypto';
window.crypto.randomUUID = randomUUID;
