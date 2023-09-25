# Digilocker Package 📁

## Overview 🚀

The Digilocker Package is a library that simplifies the integration of the Digilocker API into your applications. Digilocker is a platform that allows users to store, access, and share their documents digitally.

## Installation 📦

You can install the Digilocker Package via npm:

```bash
npm install digilocker-sdk
```

## Usage 🧰

1. **Initialize Digilocker** 🛠️

   To start using the Digilocker functions, you need to create an instance of the Digilocker class and provide the necessary configuration. Here's how to initialize the Digilocker instance:

```js
import {
  Digilocker,
  Config,
  DigiLockerFunctions,
} from 'your-digilocker-package-name';

// Configure Digilocker ⚙️
const digilockerConfig: Config = {
  clientId: 'yourClientId',
  clientSecret: 'yourClientSecret',
  callbackURL: 'yourCallbackURL',
};

// Create an instance of Digilocker 🚀
const digilockerInstance: Digilocker = new DigiLockerFunctions(
  digilockerConfig
);
```

2. **Generate Login URL** 🌐

   You can generate a login URL that users can click to initiate the Digilocker login process:

```js
const loginUrl = digilockerInstance.generateLoginUrl();
// Use this loginUrl in your application to redirect users to the Digilocker login page.
```

3. **Exchange Code for Access Token** 🔑

   After the user logs in and you receive an authorization code, use the following function to exchange the code for an access token:

```js
const authorizationCode = 'codeReceivedFromDigilocker'; // Replace with the actual code
await digilockerInstance.exchangeCodeForToken(authorizationCode);
// The access token is now available in the digilockerInstance.accessToken property.
```


```js
try {
  const issuedFiles = await digilockerInstance.fetchIssuedFiles();
  console.log('Issued Files:', issuedFiles);
} catch (error) {
  console.error('Error fetching issued files:', error);
}
```

## Error Handling ❌

Make sure to handle errors and user interactions appropriately in your application based on your specific requirements.

## License 📜

This project is licensed under the MIT License - see the LICENSE.md file for details.

## References

Digilocker APIs: [Link](https://partners.digitallocker.gov.in/assets/img/Digital%20Locker%20Authorized%20Partner%20API%20Specification%20v1.8.pdf)
