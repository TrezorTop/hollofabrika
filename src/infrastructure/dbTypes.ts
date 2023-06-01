import { GqlRole } from "./gqlTypes.js";


export type DbCategory = {
	name: string
}

// attributes: [ "weight", "price", "colors" ]
// searchQuery({ weight: "1кг", colors: "красный" }) == или any ==

export type DbProduct = {
	name: string
}

export type DbUser = {
	username: string,
	email: string,
	passwordHash: string,
	role: GqlRole
}

export type DbRefreshToken = {
	token: string,
	userId: string
}

export interface DbTemporalToken {
	type: "register" | "restore",
	emailToken: number,
	confirmToken: string
}

export interface DbRegisterTemporalToken extends DbTemporalToken {
	type: "register",
	payload: Omit<DbUser, "role">
}