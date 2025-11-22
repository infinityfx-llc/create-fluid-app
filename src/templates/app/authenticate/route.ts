export default function authRoute() {
    return `import { authEndpoint } from "@/lib/auth";

export const GET = authEndpoint;`;
}