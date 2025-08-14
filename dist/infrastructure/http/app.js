import express from 'express';
import bodyParser from 'body-parser';
import { buildRouter } from './routes.js';
import { errorHandler } from './middlewares/errorHandler.js';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'node:path';
export const app = express();
app.use(bodyParser.json());
// Swagger UI
const docPath = path.join(process.cwd(), 'src', 'infrastructure', 'http', 'docs', 'openapi.yaml');
const openapi = YAML.load(docPath);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(openapi));
app.use(buildRouter());
app.use(errorHandler);
