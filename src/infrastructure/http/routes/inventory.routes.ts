import { Router } from 'express';
import { SyncInventoryQuantityController } from '@/infrastructure/http/controllers/SyncInventoryQuantityController';
import { FindInventoryBySkuController } from '@/infrastructure/http/controllers/FindInventoryBySkuController';
import { FindAllInventoryController } from '@/infrastructure/http/controllers/FindAllInventoryController';


export const routes = Router();

routes.post('/sync-quantity', SyncInventoryQuantityController.handle);

routes.get('/inventory/:sku', FindInventoryBySkuController.handle);

routes.get('/inventory', FindAllInventoryController.handle);

