export default function authLib(domainName: string) {
    return `'use server'; 

import { createAuthInterface } from 'nano-auth';
import db from './db';
import { nanoErrors } from './utils';

const auth = createAuthInterface({
    secretKey: process.env.SECRET_KEY as string,
    endpointUrl: 'https://${domainName}/authenticate',
    errorUrl: '/sign-in',
    providers: {
        // add your providers here
    },
    async retrieveUser(id: string) {
        const user = await db.user.findUnique({
            where: {
                id
            }
        });

        return { user };
    },
    async createUser({ id, email, fullName }) {
        const duplicate = await db.user.findUnique({
            where: {
                email
            }
        });
        
        if (duplicate) return {
            error: nanoErrors.code('duplicate')
        };

        const user = await db.user.create({
            data: {
                id,
                email,
                name: fullName.split(' ')[0]
            }
        });

        return { user };
    }
});

export const { getUser, signInWith, signOut, revalidate, authEndpoint } = auth;`;
}