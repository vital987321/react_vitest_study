import { it, expect, describe } from 'vitest'

describe('Checking test setup', () => {
    it('should fetch mock server and get 3 items in response', async () => {
        const response = await fetch('/categories')
        const data = await response.json()
        console.log(data)
        expect(data).toHaveLength(3)
    })
})