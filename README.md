# Digilocker-SDK

### Current List of APIs

1. Login
2. Get Documents
3. Upload Documents (WIP)
4. eSign (WIP)

### SDK API Design
  1. User Interface describes user APIs
  2. `public readonly Digilocker.generateUser(userId: string) => User`
  4. `public readonly Digilocker.utility.generateCodeChallenge(codeVerifier?: string) => string`

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
  private loginMetadata: {
    authorizationCode: string;
    codeVerifier: string;
    accessToken: string;
  }
  documents: Document[];
  issuers: Issuer[];
  refreshIssuers: async () => Promise<void>;
  refreshDocuments: async () => Promise<void>;
  searchDocument: async (documentSearchFilter: DocumentSearchFilter) => Promise<Document[] || DocumentType>;
  searchIssuer: async (issuerSearchFilter: IssuerSearchFilter) => Promise<Issuer[]);
  logout: async () => Promise<void>;
  login: async () => Promise<LoginError || User>;
  constructURL: () => string;
  update: async (user: User) => Promise<User>;
  getDocumentByType: async (type: DocumentType) => Promise<Document>;
}

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
