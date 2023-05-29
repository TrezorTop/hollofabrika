import { ContextFunction } from "@apollo/server";
import { KoaContextFunctionArgument } from "@as-integrations/koa/src";
import { Database } from "arangojs";
import { tryAuthorizeWithJwtBearer } from "../features/JwtAuth/tryAuthorizeWithJwtBearer.js";
import { DbUser } from "./dbTypes.js";
import { connectToDb } from "./setups.js";


export interface HollofabrikaContext {
	db: Database,
	user?: DbUser
}

export const contextHandler: ContextFunction<[KoaContextFunctionArgument], HollofabrikaContext> =
	async ({ ctx }): Promise<HollofabrikaContext> => {
		const contextValue: HollofabrikaContext = {
			db: connectToDb()
		};

		const authorizationHeader = ctx.headers.authorization;

		if (authorizationHeader) {
			const [authType, authToken] = authorizationHeader.split(" ");

			switch (authType) {
				case "Bearer":
					contextValue.user = await tryAuthorizeWithJwtBearer(authToken);
					break;
			}
		}

		return contextValue;
	};