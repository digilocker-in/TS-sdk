import {
  DigiLockerDocumentType,
  DocumentSearchFilter,
  IssuerSearchFilter,
  User,
} from './types';

// Mock user object
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

// Mock implementation of MyDigiLockerClass
export class MyDigiLockerClass {
  user: User;

  constructor(user: User) {
    this.user = user;
  }

  async login() {
    return await this.user.login();
  }

  async getDocumentByType(type: DigiLockerDocumentType) {
    return await this.user.getDocumentByType(type);
  }

  async searchDocument(filter: DocumentSearchFilter) {
    return await this.user.searchDocument(filter);
  }
}
