import * as jwt from 'jsonwebtoken';

export class TokenManager {
	constructor(
		private readonly secretKey: string,
		private readonly expirationTime: number
	) {}

	generateToken(payload: object) {
		return jwt.sign(payload, this.secretKey, { expiresIn: this.expirationTime });
	}

	decodeToken(token: string) {
		return jwt.verify(token, this.secretKey);
	}
}
