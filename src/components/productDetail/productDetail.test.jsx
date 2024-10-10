import { it, expect, describe } from 'vitest'
import { render, screen } from "@testing-library/react"
import ProductDetail from "./ProductDetail"
import { products } from '../../tests/mocks/data'

describe('ProductDetail', () => {
    it('should render product detail', async () => {
        const productId=2
        render(<ProductDetail productId={productId} />)
        const productName = await screen.findByText(/name/i)
        expect(productName).toHaveTextContent(new RegExp(products[1].name));
        const productprice = await screen.findByText(/\$/i); 
        expect(productName).toBeInTheDocument();
    })
    it('should render "not found"  message if ID is not id DB', async () => {
        render(<ProductDetail productId={1000} />);
        const message = await screen.findByText(/not found/i)
        expect(message).toBeInTheDocument()
    });
    it('should render error message for invalid id=0', () => {
        render(<ProductDetail productId={0} />)
        const errorMessage=screen.getByText(/invalid product/i)
    })
})