import { Context, Next } from 'hono';

export const validateLegionaryData = async (c: Context, next: Next) => {
	try {
		const body = await c.req.json();

		const requiredFields = {
			rut: 'number',
			names: 'string',
			fatherSurname: 'string',
			motherSurname: 'string',
			phoneNumber: 'string',
			role: 'string',
			address: 'string',
			memberSince: 'string',
			quotaAmount: 'number',
			isActive: 'boolean',
		};

		for (const [key, type] of Object.entries(requiredFields)) {
			if (!(key in body)) {
				return c.json({ error: `El campo '${key}' es requerido.` }, 400);
			}

			if (typeof body[key] !== type) {
				return c.json({ error: `El campo '${key}' debe ser de tipo '${type}'.` }, 400);
			}
		}
		await next();
	} catch (error) {
		return c.json({ error: 'El cuerpo de la solicitud debe ser un JSON válido.' }, 400);
	}
};
