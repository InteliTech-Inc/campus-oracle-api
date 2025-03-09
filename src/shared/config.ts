import { createClient, SupabaseClient } from "@supabase/supabase-js";
import twilio from "twilio";
import swaggerJsdoc from "swagger-jsdoc";

interface InitializeReturnType {
    database: SupabaseClient;
    specs: object;
}

/**
 * A configuration class for initializing and managing third-party integrations and documentation.
 */
export default class Config {
    /**
     * Initializes a Supabase client.
     * @private
     * @returns {import('@supabase/supabase-js').SupabaseClient} The initialized Supabase client.
     */
    private static initSupabase =
        (): import("@supabase/supabase-js").SupabaseClient => {
            const supabaseUrl = process.env.SUPABASE_URL as string;
            const supabaseKey = process.env.SUPABASE_SERVICE_KEY as string;
            return createClient(supabaseUrl, supabaseKey, {
                auth: {
                    persistSession: true,
                },
            });
        };

    /**
     * Generates Swagger API documentation specifications.
     * @private
     * @returns {object} The Swagger specification object.
     */
    private static initSwaggerDocs = (): object => {
        return swaggerJsdoc({
            definition: {
                openapi: "3.0.0",
                info: {
                    title: "campus oracle API",
                    version: "1.0.0",
                    description:
                        "API documentation for the campus oracle application.",
                    contact: {
                        name: "campus oracle Team",
                        email: "campusoracleghana@gmail.com",
                    },
                },
                servers: [
                    {
                        url: "http://localhost:3000/",
                    },
                ],
                securityDefinitions: {
                    bearerAuth: {
                        type: "id token",
                        name: "Authorization",
                        scheme: "bearer",
                        in: "header",
                    },
                },
            },
            apis: ["./src/**/*.ts", "src/**/*.js"],
        });
    };
    /**
     * Initializes all necessary configurations and integrations.
     * @public
     * @returns {InitializeReturnType}  An object containing the initialized database and Swagger specs.
     * @property {import('@supabase/supabase-js').SupabaseClient} database - The initialized Supabase client.
     * @property {object} specs - The Swagger specification object.
     */
    static initialize = (): InitializeReturnType => {
        const database = this.initSupabase();
        const specs = this.initSwaggerDocs();
        return { database, specs };
    };
}
