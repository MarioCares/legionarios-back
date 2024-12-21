import { Hono } from 'hono';
import { cors } from 'hono/cors';
import legionariesRoute from './routes/legionaries.route';

const app = new Hono();

app.use(
	'*',
	cors({
		origin: ['http://localhost:5173', ''],
	}),
);

app.get('/', (c) => {
	return c.text('Legionarios Ok!');
});

app.route('/legionarios', legionariesRoute);

export default app;
