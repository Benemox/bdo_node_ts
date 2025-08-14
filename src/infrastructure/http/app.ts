import express from 'express';
import bodyParser from 'body-parser';
import { buildRouter } from './routes';
import { errorHandler } from './middlewares/errorHandler';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const app = express();
app.use(bodyParser.json());

// Swagger UI
const docPath = join(__dirname, 'docs', 'openapi.yaml');
const openapi = YAML.load(docPath);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(openapi));

app.use(buildRouter());
app.use(errorHandler);
