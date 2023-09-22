import { Digilocker, Config } from '../types';
import { getCodeChallenge } from '../utils';

export class DigiLockerFunctions implements Digilocker {
    private config: Config;
    private accessToken: string | null = null; // Initialize accessToken as null

    constructor(config: Config) {
        this.config = config;
    }

    init(config: Config): Digilocker {
        return new DigiLockerFunctions(config);
    }

    generateLoginUrl(): string {
        // Generate the code challenge
        const codeChallenge = getCodeChallenge();

        // Use the configuration from the DigilockerFunctions instance
        const clientId = this.config.clientId;
        const callbackURL = this.config.callbackURL;

        // Construct the login URL
        const loginUrl = `https://digilocker.meripehchaan.gov.in/public/oauth2/1/authorize?` +
            `response_type=code&client_id=${clientId}&redirect_uri=${callbackURL}&code_challenge_method=S256&code_challenge=${codeChallenge}`;

        return loginUrl;
    }

    async exchangeCodeForToken(code: string, codeVerifier: string): Promise<void> {
        const tokenUrl = 'https://digilocker.meripehchaan.gov.in/public/oauth2/1/token';

        // Use the configuration from the DigiLockerFunctions instance
        const clientId = this.config.clientId;
        const clientSecret = this.config.clientSecret;
        const callbackURL = this.config.callbackURL;

        // Create the request body in JSON format
        const requestBody = JSON.stringify({
            code_verifier: codeVerifier,
            grant_type: 'authorization_code',
            redirect_uri: callbackURL,
            code: code,
        });

        // Create the headers with authorization
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
        };

        try {
            // Make the POST request to exchange code for access token
            const response = await fetch(tokenUrl, {
                method: 'POST',
                headers: headers,
                body: requestBody,
            });

            // Check if the response is successful
            if (response.ok) {
                const data = await response.json();
                this.accessToken = data.access_token; // Set the accessToken
            } else {
                // Handle the error response here
                const errorResponse = await response.text();
                throw new Error(`Error exchanging code for token: ${errorResponse}`);
            }
        } catch (error: any) {
            throw new Error(`Failed to exchange code for token: ${error.message}`);
        }
    }

    async fetchIssuedFiles(): Promise<any> {
        if (!this.accessToken) {
            throw new Error('Access token is not available. Call exchangeCodeForToken first.');
        }

        const apiUrl = 'https://digilocker.meripehchaan.gov.in/public/oauth2/2/files/issued';

        // Create the headers with the access token
        const headers = {
            'Authorization': `Bearer ${this.accessToken}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        };

        try {
            // Make the GET request to fetch issued files
            const response = await fetch(apiUrl, {
                method: 'GET',
                headers: headers,
            });

            // Check if the response is successful
            if (response.ok) {
                const data = await response.json();
                return data; // Return the fetched issued files
            } else {
                // Handle the error response here
                const errorResponse = await response.text();
                throw new Error(`Error fetching issued files: ${errorResponse}`);
            }
        } catch (error: any) {
            throw new Error(`Failed to fetch issued files: ${error.message}`);
        }
    }
}
