// main.ts
import { Application, oakCors, Router } from "./deps.ts";
import { config, Database } from "./deps.ts";

// setup env variables
const env = config();

// Get the environment variables
const UID = env.UID;
const SECRET = env.SECRET;
const REDIRECT_URI = env.REDIRECT_URI;
const BASE_URL = env.BASE_URL;

// Structure of stored documents (Campus)
interface Campus {
    id: number;
    name: string;
}

// Structure of stored documents (Promo)
interface Promo {
    pool_year: number;
    pool_month: string;
    begin_at: string;
    Campus: Campus;
}

// Initialize the databases
const campusDB = new Database("db/campus.json");
const promoDB = new Database("db/promo.json");

// Create a router
const router = new Router();

// Create a route
router.post("/login", async (context) => {
    const body = await context.request.body().value;
    const code = body.query.code;
    var contextResponse = {
        status: 200,
        data: {},
        message: "",
    };
    try {
        const response = await fetch("https://api.intra.42.fr/oauth/token", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                grant_type: "authorization_code",
                client_id: UID,
                client_secret: SECRET,
                code: code,
                redirect_uri: REDIRECT_URI,
            }),
        });
        const data = await response.json();
        contextResponse = {
            status: 200,
            data: data,
            message: "Login successful",
        };
    } catch (error) {
        console.log("error[65]: ", error);
        contextResponse = {
            status: 400,
            data: {},
            message: error,
        };
    }
    const token = (contextResponse.data as { access_token: string }).access_token;
    try {
        const me = await fetch(`${BASE_URL}/v2/me`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });
        const me_data = await me.json();
        const campus = me_data.campus[0];
        const begin_at = me_data.cursus_users[0].begin_at;
        var promoExists = await promoDB.findOne({ begin_at: begin_at });
        if (!promoExists) {
            const begin_at_date = new Date(begin_at);
            const newPromo: Promo = {
                pool_year: begin_at_date.getUTCFullYear(),
                pool_month: begin_at_date.toLocaleString('default', { month: 'long' }),
                begin_at: begin_at,
                Campus: {
                    id: campus.id,
                    name: campus.name,
                },
            };
            await promoDB.insertOne(newPromo);
            promoExists = newPromo;
        }
        contextResponse.data = {
            ...contextResponse.data,
            campus: campus,
            promo: promoExists,
        };
        // ----------------------------------------------------
    } catch (error) {
        console.log("error[106]: ", error);
        contextResponse = {
            status: 400,
            data: {},
            message: error,
        };
    }
    context.response.body = contextResponse;
});

// Create your Deno application
const app = new Application();
app.use(oakCors());
app.use(router.routes());
app.use(router.allowedMethods());

// Start the server
console.log("Server is running on http://localhost:8000");
await app.listen({ port: 8000 });
