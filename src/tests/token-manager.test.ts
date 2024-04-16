import { anything, check, dictionary, property, string } from 'fast-check';
import { TokenManager } from '../core/token-manager';
describe('The Token Manager', () => {
	const tokenManager = new TokenManager('superSecretKey', 0);
	test('a generated token contains the original payload when is decoded', () => {
		check(
			property(dictionary(string(), anything()), (payload) => {
				const token = tokenManager.generateToken(payload);
				const decodedPayload = tokenManager.decodeToken(token);
				expect(decodedPayload).toEqual(token);
			})
		);
	});

	test('a token decoded with an incorrect key results in an error', () => {
		const tokenManagerWithIncorrectKey = new TokenManager('incorrectSecretKey', 0);

		check(
			property(dictionary(string(), anything()), (payload) => {
				const token = tokenManager.generateToken(payload);
				expect(() => tokenManagerWithIncorrectKey.decodeToken(token)).toThrow();
			})
		);
	});

	test('a manipulated token results in an error when is decoded ', () => {
		check(
			property(dictionary(string(), anything()), string(), (payload, extraData) => {
				const token = tokenManager.generateToken(payload);
				const manipulatedToken = token + extraData;
				expect(() => tokenManager.decodeToken(manipulatedToken)).toThrow();
			})
		);
	});
});
