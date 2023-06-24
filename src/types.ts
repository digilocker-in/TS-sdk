// The logger should ideally have a function to log
export interface Logger {
  log: (message: string) => void;
}

// Define the status as an object containing status and message
export interface Status<T> {
  status: 'success' | 'error';
  message: string;
  data?: T;
}

// FetchFunction should be a function type.
// The specific type definition depends on how you want to use it.
// Here's a sample based on the Fetch API.
export interface FetchFunction {
  (input: RequestInfo, init?: RequestInit): Promise<Response>;
}

// Config remains the same
export interface Config {
  // Application level config
  clientId: string;
  clientSecret: string;
  callbackURL: string;
}

// Define the PersistFunction and User types based on your requirements.
// Here are sample definitions.
export interface User {
  id: string;
  // Add more properties as required
}

// Redefine Digilocker with the correct types
export interface Digilocker {
  init: (config: Config) => Digilocker;
  generateUser: (userId: string) => User;
  setPersistence: (persistFunction: PersistFunction) => Status<PersistFunction>;
  setFetch: (fetchFunction: FetchFunction) => Status<FetchFunction>;
  setLogger: (logger: Logger) => Status<Logger>;

  utility: {
    generateCodeChallenge: (codeVerifier?: string) => string;
  };
}

export enum DigiLockerDocumentType {
  AADHAAR = 1,
}

export interface DocumentMapping {
  name: string;
  type: DigiLockerDocumentType;
  description: string;
  id: string;
  digilockerId: string;
}

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

export interface Issuer {
  id: string;
  name: string;
  description: string;
}

export interface LoginMetadata {
  authorizationCode: string;
  codeVerifier: string;
  accessToken: string;
}

type PersistResponse<T> = {
  status: 'success' | 'error';
  data: T;
};

type PersistFunction = (user: User) => Promise<PersistResponse<User>>;

export interface DocumentSearchFilter {
  DigiLockerDocumentType: DigiLockerDocumentType[];
  issuer: Issuer;
  name: string;
  date__gte: string;
  date__lte: string;
}

export interface IssuerSearchFilter {
  id: string;
  name: string;
}

export interface LoginError {
  // Define properties of LoginError if any
}

export interface User {
  userId: string;
  isLoggedIn: boolean;
  constructURL: () => string;
  loginCallback: (authorizationCode: string) => User;
  login: () => Promise<LoginError | User>;
  loginMetadata: LoginMetadata;
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
  fetch: FetchFunction;
  log: Logger;
  getData: () => Promise<Partial<User>>;
}
