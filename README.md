# Digilocker-SDK

### Current List of APIs

1. Login
2. Get Documents
3. Upload Documents (WIP)
4. eSign (WIP)

### SDK API Design

1. Login
  Command line util
  ENV - `clientId, clientSecret, callbackURL` => URL
  Login - gives you a URL that you can open your browser to login and then redirect
  SDK - can include a server which will have a redirect URL deployed => JSON
  ```json
  {
    "authorizationCode": "verySimpleCode",
    "user": "userId",
    "codeVerifier": ""
  }
  ```
  2. `public readonly Digilocker.generateUser(userId: string) => User` (Assume this to be aadhaar)
  4. `public readonly Digilocker.utility.generateCodeChallenge(codeVerifier?: string) => string`

### DocumentType
```ts
interface DocumentType {
  
}

```

### Document
```ts
interface Document {
  name": "string",
  type": "string",
  size": "string",
  date": "string",
  parent": "string",
  mime": [
    {}
  ],
  "uri": "string",
  "doctype": "string",
  "description": "string",
  "issuerid": "string",
  "issuer": "string"
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
}
```
