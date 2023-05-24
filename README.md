# Digilocker-SDK

### Current List of APIs

1. Login
2. Get Documents
3. Upload Documents (WIP)
4. eSign (WIP)


### Digilocker
```ts

interface Config {
  // Application level config
  clientId: string;
  clientSecret: string;
  callbackURL: string;
}

interface Digilocker {
  init: (config: Config) => Digilocker;
  generateUser: (userId: string) => User;
  setPersistence: (persistFunction: PersistFunction) => Status<PersistFunction>;
  setFetch: (fetchFunction: FetchFunction) => Status<FetchFunction>;
  setLogger: (logger: Logger) => Status<Logger>;

  utility: {
    generateCodeChallenge: (codeVerifier?: string) => string;
  };
}
```

### DocumentType
```ts
enum DocumentType {
  AADHAAR = 1,
  ...
}

// Digilocker to DocumentTypeMapping
private interface DocumentMapping {
  name: string
  type: DocumentType
  description: string 
  id: string
  digilockerId: string
}
```

### Document
```ts
interface Document {
  name: string
  type: string
  size: string
  date: string
  parent: string
  mime: [
    {}
  ]
  uri: string
  doctype: DocumentType
  description: string
  issuerid: string
  issuer: string
}
```

### Issuer
```ts
interface Issuer {
  id: string,
  name: string,
  description: string
}
```

### User
```ts
interface User {
  userId: string;
  isLoggedIn: boolean;

  // User goes and logs in on the frontend => authorizationCode;
  constructURL: () => string;
  loginCallback: (authorizationCode: string) => User;

  login:() => Promise<LoginError || User>;
  
  loginMetadata: {
    authorizationCode: string;
    codeVerifier: string;
    accessToken: string;
  }

  documents: Document[];
  issuers: Issuer[];
  
  refreshIssuers:() => Promise<void>;
  refreshDocuments:() => Promise<void>;
  searchDocument:(documentSearchFilter: DocumentSearchFilter) => Promise<Document[] || DocumentType>;
  searchIssuer:(issuerSearchFilter: IssuerSearchFilter) => Promise<Issuer[]>);
  logout:() => Promise<void>;

  refreshAccessToken: () => Promise<void>;

  update:(user: User) => Promise<User>;
  getDocumentByType:(type: DocumentType) => Promise<Document>;

  // Globals from Digilocker
  persist: PersistFunction;
  fetch: FetchFunction;
  log: Logger;

  // Frontend UserData
  public getData: () => Promise<Partial<User>>;
}

interface PersistFunction {  (user: User) => Promise<PersistResponse<User>>}

// AND and string are matched by contains
interface DocumentSearchFilter {
  documentType: DocumentType[];
  issuer: Issuer;
  name: string;
  date__gte: string;
  date__lte: string;
}

// AND and string are matched by contains
interface IssuerSearchFilter {
  id: string,
  name: string
}

interface LoginError {
  ...
}
```

