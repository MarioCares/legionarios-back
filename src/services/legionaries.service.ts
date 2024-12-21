import { LegionariesRepository } from '../repositories/LegionariesRepository';
import { TLegionary } from '../types/legionary.type';

export const LegionariesService = {
	getAll: async function ({ url }: { url: string }) {
		try {
			return LegionariesRepository.getAll({ url });
		} catch (error: any) {
			console.error('LegionariesService.getAll error', error);
			throw new Error(`LegionariesService.getAll: ${error.message}`);
		}
	},
	get: async function ({ rut, url }: { rut: string; url: string }) {
		try {
			return LegionariesRepository.get({ rut, url });
		} catch (error: any) {
			console.error('LegionariesService.get error', error);
			throw new Error(`LegionariesService.get: ${error.message}`);
		}
	},
	post: async function ({ data, url }: { data: any; url: string }) {
		try {
			return LegionariesRepository.post({ legionary: data as TLegionary, url });
		} catch (error: any) {
			console.error('LegionariesService.post error', error);
			throw new Error(`LegionariesService.post: ${error.message}`);
		}
	},
	put: async function ({ rut, data, url }: { rut: number; data: any; url: string }) {
		try {
			return LegionariesRepository.put({ rut, legionary: data as TLegionary, url });
		} catch (error: any) {
			console.error('LegionariesService.put error', error);
			throw new Error(`LegionariesService.put: ${error.message}`);
		}
	},
};
