import { it, expect, describe } from 'vitest'
import { db } from '../../tests/mocks/db'

describe('Checking', () => {
    it('should', async () => {
        const firstProduct = db.product.create()
        console.log(firstProduct)
        const product = db.product.create({ name: 'Apple' });
        console.log(db.product.getAll())
        db.product.delete({ where: { id: { equals: product.id } } })
        db.product.delete({where: {}});
        
    })
})