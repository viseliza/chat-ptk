// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		interface Locals {
			session: {
				user_id: number | undefined,
				login: string | undefined,
				theme: string,
				role: string | undefined
			}
		}
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};
