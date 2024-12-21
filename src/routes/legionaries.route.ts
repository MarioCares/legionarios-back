import { Hono } from 'hono';
import { env } from 'hono/adapter';
import { LegionariesService } from '../services/legionaries.service';
import { validateLegionaryData } from '../middlewares/legionaries.middleware';

const app = new Hono();

app
	.get('/', async (c) => {
		const { DATABASE_URL } = env<{ DATABASE_URL: string }>(c);
		try {
			return c.json(await LegionariesService.getAll({ url: DATABASE_URL }));
		} catch (error: any) {
			return c.json({ error: error.message }, 500);
		}
	})
	.get('/:rut', async (c) => {
		const rut = c.req.param('rut');
		const { DATABASE_URL } = env<{ DATABASE_URL: string }>(c);
		try {
			return c.json(await LegionariesService.get({ rut, url: DATABASE_URL }));
		} catch (error: any) {
			return c.json({ error: error.message }, 500);
		}
	})
	.post('/', validateLegionaryData, async (c) => {
		const { DATABASE_URL } = env<{ DATABASE_URL: string }>(c);
		try {
			const data = await c.req.json();
			return c.json(await LegionariesService.post({ data, url: DATABASE_URL }));
		} catch (error: any) {
			return c.json({ error: error.message }, 500);
		}
	})
	.put('/:rut', validateLegionaryData, async (c) => {
		const { DATABASE_URL } = env<{ DATABASE_URL: string }>(c);
		try {
			const rut = c.req.param('rut');
			const data = await c.req.json();
			return c.json(await LegionariesService.put({ rut: Number(rut), data, url: DATABASE_URL }));
		} catch (error: any) {
			return c.json({ error: error.message }, 500);
		}
	});

export default app;
