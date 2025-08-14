import { Router } from 'express';
import { routes } from '@/infrastructure/http/routes/inventory.routes';

export function buildRouter(): Router {
  const router = Router();

  router.use('/inventory', routes);

  return router;
}
