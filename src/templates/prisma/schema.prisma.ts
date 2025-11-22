import { DBEngine } from "../lib/db";

export default function prismaSchema(dbEngine: DBEngine) {
    return `generator client {
    provider = "prisma-client"
    output   = "./generated"
}

datasource db {
    provider = "${dbEngine}"
}

model User {
    id     String     @id
    email  String     @unique
    name   String
}`;
}