import { NextPageContext } from "next";
import { getSession, signOut } from "next-auth/react";

export class BaseAPI {
	protected baseURL: string;

	constructor(baseURL: string) {
		this.baseURL = baseURL;
	}

	private async token(ctx?: NextPageContext) {
		const session = (await getSession(ctx)) as any;
		return session?.user?.accessToken;
	}

	private async handleResponse<T>(res: Response): Promise<T> {
		if (res.status === 401) {
			if (typeof window !== "undefined") {
				signOut();
			} else {
				throw new Error("Unauthorized");
			}
		}
		return await res.json();
	}

	protected async get<T>(url: string, ctx?: NextPageContext): Promise<T> {
		const token = await this.token(ctx);
		const res = await fetch(`${this.baseURL}/${url}`, {
			method: "GET",
			headers: {
				"content-type": "application/json",
				Accept: "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		return this.handleResponse<T>(res);
	}

	protected async post<T>(url: string, payload: unknown, ctx?: NextPageContext): Promise<T> {
		const token = await this.token(ctx);
		const res = await fetch(`${this.baseURL}/${url}`, {
			method: "POST",
			headers: {
				"content-type": "application/json",
				Accept: "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(payload),
		});
		return this.handleResponse<T>(res);
	}

	protected async put<T>(url: string, payload: unknown, ctx?: NextPageContext): Promise<T> {
		const token = await this.token(ctx);
		const res = await fetch(`${this.baseURL}/${url}`, {
			method: "PUT",
			headers: {
				"content-type": "application/json",
				Accept: "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(payload),
		});
		return this.handleResponse<T>(res);
	}

	protected async patch<T>(url: string, payload: unknown, ctx?: NextPageContext): Promise<T> {
		const token = await this.token(ctx);
		const res = await fetch(`${this.baseURL}/${url}`, {
			method: "PATCH",
			headers: {
				"content-type": "application/json",
				Accept: "application/json",
				// Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(payload),
		});
		return this.handleResponse<T>(res);
	}

	protected async delete<T>(url: string, payload: unknown, ctx?: NextPageContext): Promise<T> {
		const token = await this.token(ctx);
		const res = await fetch(`${this.baseURL}/${url}`, {
			method: "DELETE",
			headers: {
				"content-type": "application/json",
				Accept: "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(payload),
		});

		return this.handleResponse<T>(res);
	}

	protected async image<T>(url: string, data: FormData, ctx?: NextPageContext): Promise<T> {
		const token = await this.token(ctx);
		const res = await fetch(`${this.baseURL}/${url}`, {
			method: "POST",
			headers: {
				Accept: "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: data,
		});

		return this.handleResponse<T>(res);
	}

	protected async postForm<T>(url: string, data: FormData, ctx?: NextPageContext): Promise<T> {
		const token = await this.token(ctx);
		return await fetch(`${this.baseURL}/${url}`, {
			headers: {
				Accept: "application/json",
				Authorization: `Bearer ${token}`,
			},
			method: "POST",
			body: data,
		}).then((r) => r.json());
	}
}
