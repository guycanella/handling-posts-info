import { LetterClass } from '../src/Classes/LetterClass'

describe('LetterClass', () => {
	it('should fail to fetch an inexistent name from API', async () => {
		const Letter = new LetterClass('Inexistent name')
		const result = await Letter.get()
		expect(result.length).toBe(0)
	})

	it('should succeeded to fetch an existent name from API', async () => {
		const Letter = new LetterClass('Leanne')
		const result = await Letter.get()
		expect(result.length).toBeGreaterThan(0)
	})
})

export {}
