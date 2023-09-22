import { Config, Digilocker } from '../types';

export class DigiLockerConfig implements Digilocker {
    private clientId: string;
    private clientSecret: string;
    private callbackURL: string;

    constructor(config: Config) {
        this.clientId = config.clientId;
        this.clientSecret = config.clientSecret;
        this.callbackURL = config.callbackURL;
    }

    init(config: Config): Digilocker {
        return new DigiLockerConfig(config);
    }

    getClientId(): string {
        return this.clientId;
    }

    getClientSecret(): string {
        return this.clientSecret;
    }

    getCallbackURL(): string {
        return this.callbackURL;
    }

    // You can add methods to set or update configuration values if needed
}
