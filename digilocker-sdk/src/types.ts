// Define the Config interface
export interface Config {
  // Application level config
  clientId: string;
  clientSecret: string;
  callbackURL: string;
}

// Define the Digilocker interface
export interface Digilocker {
  init: (config: Config) => Digilocker;
  // ... Add other methods and properties as needed
}

// Define the DigiLockerDocumentType enum
export enum DigiLockerDocumentType {
  AADHAAR = 1,
}

// Define the DocumentMapping interface
export interface DocumentMapping {
  name: string;
  type: DigiLockerDocumentType;
  description: string;
  id: string;
  digilockerId: string;
}

// Define the Document interface
export interface Document {
  name: string;
  type: string;
  size: string;
  date: string;
  parent: string;
  mime: Array<{ [key: string]: any }>; // Define the exact shape of mime object if known
  uri: string;
  digiLockerDoctype: DigiLockerDocumentType;
  description: string;
  issuerid: string;
  issuer: string;
}

// Define the Issuer interface
export interface Issuer {
  id: string;
  name: string;
  description: string;
}

// Define the LoginMetadata interface
export interface LoginMetadata {
  authorizationCode: string;
  codeVerifier: string;
  accessToken: string;
}

// Define the PersistResponse type
export type PersistResponse<T> = {
  status: 'success' | 'error';
  data: T;
};

// Define the PersistFunction type
export type PersistFunction = (user: User) => Promise<PersistResponse<User>>;

// Define the DocumentSearchFilter interface
export interface DocumentSearchFilter {
  digiLockerDocumentType: DigiLockerDocumentType[];
  issuer: Issuer;
  name: string;
  date__gte: string;
  date__lte: string;
}

// Define the IssuerSearchFilter interface
export interface IssuerSearchFilter {
  id: string;
  name: string;
}

// Define the LoginError interface
export interface LoginError {
  // Define properties of LoginError if any
}

// Define the User interface
export interface User {
  userId: string;
  isLoggedIn: boolean;
  constructURL: () => string;
  loginCallback: (authorizationCode: string) => User;
  login: () => Promise<LoginError | User>;
  loginMetadata: LoginMetadata | undefined;
  documents: Document[];
  issuers: Issuer[];
  refreshIssuers: () => Promise<void>;
  refreshDocuments: () => Promise<void>;
  searchDocument: (
    documentSearchFilter: DocumentSearchFilter
  ) => Promise<Document[] | DigiLockerDocumentType>;
  searchIssuer: (issuerSearchFilter: IssuerSearchFilter) => Promise<Issuer[]>;
  logout: () => Promise<void>;
  refreshAccessToken: () => Promise<void>;
  update: (user: User) => Promise<User>;
  getDocumentByType: (type: DigiLockerDocumentType) => Promise<Document>;
  persist: PersistFunction;
  getData: () => Promise<Partial<User>>;
};
