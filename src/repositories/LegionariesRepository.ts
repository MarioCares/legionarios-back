import { Client } from 'pg';
import { TLegionary } from '../types/legionary.type';
import { getFormattedDateTimeInChile } from '../utils/dates';

export const LegionariesRepository = {
	getAll: async function ({ url }: { url: string }) {
		try {
			const client = new Client({ connectionString: url });
			await client.connect();
			const { rows } = await client.query('SELECT * FROM legionaries ORDER BY "fatherSurname" ASC');
			await client.end();
			return rows;
		} catch (error: any) {
			console.error('LegionariesRepository.getAll error: ', error);
		}
	},
	get: async function ({ rut, url }: { rut: string; url: string }) {
		try {
			const client = new Client({ connectionString: url });
			await client.connect();
			const { rows } = await client.query('SELECT * FROM legionaries WHERE rut = $1 ORDER BY "fatherSurname" ASC', [rut]);
			await client.end();
			return rows;
		} catch (error: any) {
			console.error('LegionariesRepository.get error: ', error);
		}
	},
	post: async function ({ legionary, url }: { legionary: TLegionary; url: string }) {
		try {
			const client = new Client({ connectionString: url });
			await client.connect();
			const { rows } = await client.query(
				'INSERT INTO legionaries (rut, names, "fatherSurname", "motherSurname", "phoneNumber", role, address, "memberSince", "quotaAmount", "isActive", created_at) ' +
					'VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *;',
				[
					legionary.rut,
					legionary.names,
					legionary.fatherSurname,
					legionary.motherSurname,
					legionary.phoneNumber,
					legionary.role,
					legionary.address,
					legionary.memberSince,
					legionary.quotaAmount,
					legionary.isActive,
					getFormattedDateTimeInChile(),
				],
			);
			await client.end();
			return rows;
		} catch (error: any) {
			console.error('LegionariesRepository.post error: ', error);
		}
	},
	put: async function ({ rut, legionary, url }: { rut: number; legionary: TLegionary; url: string }) {
		try {
			const client = new Client({ connectionString: url });
			await client.connect();
			const { rows } = await client.query(
				'UPDATE legionaries SET rut = $1, names = $2, "fatherSurname" = $3, "motherSurname" = $4, "phoneNumber" = $5, role = $6, ' +
					'address = $7, "memberSince" = $8, "quotaAmount" = $9, "isActive" = $10, created_at = $11 WHERE rut = $12 RETURNING *;',
				[
					legionary.rut,
					legionary.names,
					legionary.fatherSurname,
					legionary.motherSurname,
					legionary.phoneNumber,
					legionary.role,
					legionary.address,
					legionary.memberSince,
					legionary.quotaAmount,
					legionary.isActive,
					getFormattedDateTimeInChile(),
					rut,
				],
			);
			await client.end();
			return rows;
		} catch (error: any) {
			console.error('LegionariesRepository.put error: ', error);
		}
	},
};
