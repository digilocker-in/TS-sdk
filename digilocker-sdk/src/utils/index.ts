import { sha256 } from "js-sha256";

const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#*!";

function generateString(length: number) {
    let result = "";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

export const getCodeVerifier = () => {
    return generateString(10) + Date.now();
}
export const getCodeChallenge = (codeVerifier: string) => {
    const encryptedSha256 = sha256(codeVerifier);
    let encryptedbase64 = btoa(encryptedSha256);
    encryptedbase64 = encryptedbase64.replace(/=/g, ""); // Remove any trailing '='
    encryptedbase64 = encryptedbase64.replace(/\+/g, "-"); // Replace '+' with '-'
    encryptedbase64 = encryptedbase64.replace(/\//g, "_"); // Replace '/' with '_'
    return encryptedbase64;
};
