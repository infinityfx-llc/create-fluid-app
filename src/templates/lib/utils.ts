export default function utilsLib() {
    return `import { AuthErrors } from "nano-auth";

export const nanoErrors = new AuthErrors();`;
}