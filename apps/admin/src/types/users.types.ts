import type { Profile } from "@bn/types";

export interface BaseUsers {
    id: Profile['id'];
    email: string;
    username?: Profile['username'];
}