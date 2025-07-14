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
const campusDB = new Database("api/db/campus.json");
const promoDB = new Database("api/db/promo.json");

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
        Authorization: `Bearer ${token}`,
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
        pool_month: begin_at_date.toLocaleString("default", {
          month: "long",
        }),
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
    console.log("error[109]: ", error);
    contextResponse = {
      status: 400,
      data: {},
      message: error,
    };
  }
  context.response.body = contextResponse;
});

const getCampusId = async (campus_name: String, token: String) => {
  const endPoint: String = "/v2/campus?filter[country]=Morocco";
  try {
    const response = await fetch(`${BASE_URL}${endPoint}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    const campus = data.find((campus: any) => campus.name === campus_name);
    if (campus === undefined) {
      return 55; // Default campus id
    }
    return campus.id;
  } catch (error) {
    return 55; // Default campus id
  }
};

// create a route
router.post("/cursus_users", async (context) => {
  const body = await context.request.body().value;
  const firstDay = body.query.firstDay;
  const lastDay = body.query.lastDay;
  const page = body.query.page;
  const token = body.query.token;
  const currentPage = body.query.currentPage;
  const campus_name = body.query.campus_name;
  const CAMPUS_ID_MAP: { [key: string]: number } = {
    "Khouribga": 16,
    "Benguerir": 21,
    "Tétouan": 55,
    "Rabat": 75,
  };
  const campus_id = CAMPUS_ID_MAP[campus_name as string] || 55; // Default to Tétouan if not found
  const endPoint: String = `/v2/cursus/9/cursus_users?filter[campus_id]=${campus_id}&range[begin_at]=${firstDay},${lastDay}&page=${page}&per_page=100&sort=-level`;
  try {
    const response = await fetch(`${BASE_URL}${endPoint}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    let tempUsers = [];
    try {
      tempUsers = data.map((user: any, index: number) => ({
        id: user.user.id,
        order: currentPage * 100 - 99 + index,  // Pure calculation
        login: user.user.login,
        image: user.user.image.versions.medium,
        lvl: user.level.toFixed(2),
      }));
    } catch (mapError) {
      console.log("Mapping error: ", mapError);
    }
    context.response.body = {
      status: 200,
      data: tempUsers,
      message: "Users fetched successfully",
    };
  } catch (error) {
    console.log("error[177]: ", error);
    context.response.body = {
      status: 400,
      data: {},
      message: error,
    };
  }
});

// Create your Deno application
const app = new Application();
app.use(oakCors());
app.use(router.routes());
app.use(router.allowedMethods());

// Start the server
console.log("Server is running on localhost:8000");
await app.listen({ port: 8000 });
