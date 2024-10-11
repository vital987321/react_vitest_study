import { it, expect, describe } from 'vitest'
import { render, screen } from "@testing-library/react"
import ProductDetail from "./ProductDetail"
import { products } from '../../tests/mocks/data'
import { db } from '../../tests/mocks/db'
import { http, HttpResponse } from 'msw'
import { server } from '../../tests/mocks/server'

describe('ProductDetail', () => {
    let productId;
    beforeAll(() => {
      const product = db.product.create()  
      productId=product.id
    })
    afterAll(() => {

      db.product.delete({ where: { id: { equals: productId } } });
    });
    it('should render product detail', async () => {
        const product = db.product.getAll()[0]
        render(<ProductDetail productId={product.id} />)
        const productName = await screen.findByText(new RegExp(product.name))
        expect(productName).toHaveTextContent(new RegExp(product.name));
        const productprice = await screen.findByText(/\$/i); 
        expect(productprice).toBeInTheDocument();
    })
    it('should render "not found"  message if ID is not id DB', async () => {
        const product = db.product.getAll()[0];
        const productId=product.id+1
        render(<ProductDetail productId={productId} />);
        const message = await screen.findByText(/not found/i)
        expect(message).toBeInTheDocument()
    });
    it('should render "Invalid ProductId" message for product id=0', () => {
      render(<ProductDetail productId={0} />);
      const errorMessage = screen.getByText(/invalid product/i);
    });
    it('should should render an error message', async () => {
        server.use(http.get('/products/:id', ({ params }) => HttpResponse.error([])))
        render(<ProductDetail productId={1} />)
        const errorMessage = await screen.findByText(/error/i)
        expect(errorMessage).toBeInTheDocument()
    })
})


// describe("ProductDetail", () => {
//   it("should render product detail", async () => {
//     const productId = 2;
//     render(<ProductDetail productId={productId} />);
//     const productName = await screen.findByText(/name/i);
//     expect(productName).toHaveTextContent(new RegExp(products[1].name));
//     const productprice = await screen.findByText(/\$/i);
//     expect(productName).toBeInTheDocument();
//   });
//   it('should render "not found"  message if ID is not id DB', async () => {
//     render(<ProductDetail productId={1000} />);
//     const message = await screen.findByText(/not found/i);
//     expect(message).toBeInTheDocument();
//   });
//   it("should render error message for invalid id=0", () => {
//     render(<ProductDetail productId={0} />);
//     const errorMessage = screen.getByText(/invalid product/i);
//   });
// });