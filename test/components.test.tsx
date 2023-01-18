/**
 * @jest-environment jsdom
 */

import React from 'react'
import { LetterClass } from '../src/Classes/LetterClass'
import { render } from '@testing-library/react'
import ResponseComponent from '../src/components/ResponseComponent'

describe('LetterClass', () => {
	it('should not render ResponseComponent', async () => {
		const Letter = new LetterClass('Inexistent name')
		const results = await Letter.get()
		const { getByText } = render(<ResponseComponent results={results} />)
		expect(getByText('Posts:')).toBeTruthy()
	})
})

export {}
