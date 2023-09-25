// import { sum } from '../src';

import { IssuerSearchFilter } from '../dist/types';
import {
  User,
  DigiLockerDocumentType,
  DocumentSearchFilter,
  Issuer,
  Document as DigilockerDocument,
} from '../src';
// Replace with your actual file
import { MyDigiLockerClass } from '../src/impl'; // This is hypothetical, replace with your actual class or function

// Initialize your mock user and class instance
const user: User = {
  id: 'user1',
  userId: 'user1',
  isLoggedIn: false,
  login: async () => {
    user.loginMetadata = {
      authorizationCode: 'code',
      codeVerifier: 'verifier',
      accessToken: 'token',
    };
    return user;
  },
  loginCallback: (authorizationCode: string) => user,
  constructURL: () => 'http://localhost',
  loginMetadata: undefined,
  documents: [],
  issuers: [],
  refreshIssuers: async () => {},
  refreshDocuments: async () => {},
  searchDocument: async (documentSearchFilter: DocumentSearchFilter) => [],
  searchIssuer: async (issuerSearchFilter: IssuerSearchFilter) => [],
  logout: async () => {
    user.isLoggedIn = false;
  },
  refreshAccessToken: async () => {},
  update: async (newUser: User) => newUser,
  getDocumentByType: async (type: DigiLockerDocumentType) => {
    return {
      name: 'Aadhaar',
      type: 'government',
      size: 'small',
      date: '2023-06-24',
      parent: 'documents',
      mime: [],
      uri: 'http://localhost/doc',
      doctype: type,
      digiLockerDoctype: type, // This is a placeholder, replace with actual data
      description: "User's Aadhaar card",
      issuerid: 'issuer1',
      issuer: 'Government',
    };
  },
  persist: async (userData: User) => {
    return {
      status: 'success',
      data: userData,
    };
  },
  fetch: async (input: RequestInfo, init?: RequestInit) => {
    return new Response();
  },
  log: {
    log: (message: string) => {
      console.log(message);
    },
  },
  getData: async () => {
    return user;
  },
};

let digiLockerInstance = new MyDigiLockerClass(user);

describe('User', () => {
  it('should login correctly', async () => {
    const result = await digiLockerInstance.login();
    expect(result).toHaveProperty('loginMetadata', {
      authorizationCode: 'code',
      codeVerifier: 'verifier',
      accessToken: 'token',
    });
  });

  it('should return the correct document by type', async () => {
    const docType = DigiLockerDocumentType.AADHAAR;
    const result = await digiLockerInstance.getDocumentByType(docType);
    expect(result).toHaveProperty(
      'digiLockerDoctype',
      DigiLockerDocumentType.AADHAAR
    );
  });

  it('should search documents correctly', async () => {
    const filter: DocumentSearchFilter = {
      digiLockerDocumentType: [DigiLockerDocumentType.AADHAAR],
      issuer: {
        id: '',
        name: '',
        description: '',
      } as Issuer,
      name: 'John Doe',
      date__gte: '2023-01-01',
      date__lte: '2023-12-31',
    };
    const result = await digiLockerInstance.searchDocument(filter);
    expect(result).toBeInstanceOf(Array);
  });
});
