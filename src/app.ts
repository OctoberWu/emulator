import express, { Application } from "express";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";

import Router from "./routes";
import { greetingBanner } from "./services/greeting-banner"

const PORT = Number(process.env.PORT) || 8000;
const app: Application = express();

app.use(express.json());
app.use(morgan("tiny")); // RESTful API logging tool
app.use(express.static("public"));

app.use("/docs", swaggerUi.serve,
	swaggerUi.setup(undefined, {
		swaggerOptions: {
			url: "/swagger.json" // CRITICAL! `/` is a must
		}
	}))

app.use(Router);

app.listen(PORT, () => {
	console.log(greetingBanner('127.0.0.1', PORT));
})