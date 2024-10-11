import { render, screen } from "@testing-library/react";
import ProductList from "./ProductList";
import { server } from "../../tests/mocks/server";
import { http, HttpResponse } from "msw";
import { afterAll, beforeAll } from "vitest";
import { db } from "../../tests/mocks/db";




describe('ProductList with Moked db', () => {
    const productsIds=[]
    beforeAll(() => {
        [1, 2, 3].forEach(() => {
            const product = db.product.create()
            productsIds.push(product.id)
        })
    })
    afterAll(() => {
        db.product.deleteMany({where:{id:{in: productsIds}}})
    })

    it("should render a list of fetched products", async () => {
      render(<ProductList />);
      const products = await screen.findAllByRole("listitem");
      expect(products.length).toBeGreaterThan(0);
    });
    it('should render "no products" if empty array is fetched', async () => {
      server.use(http.get("/products", () => HttpResponse.json([])));
      render(<ProductList />);
      const message = await screen.findByText(/no products/i);
      expect(message).toBeInTheDocument();
    });
    it('shoud render error',  async () => {
        server.use(http.get("/products", () => HttpResponse.error([])));
        render(<ProductList />);
        const message = await screen.findByText(/error/i);
        expect(message).toBeInTheDocument();
    })
})


// describe('ProductList without Moked db', () => {
//     it('should render a list of fetched products', async () => {
//         render(<ProductList />)
//         const products = await screen.findAllByRole('listitem')
//         expect(products.length).toBeGreaterThan(0)
//     })
//     it('should render "no products" if empty array is fetched', async () => {
//         server.use(http.get('/products', ()=>HttpResponse.json([])))
//         render(<ProductList />)
//         const message = await screen.findByText(/no products/i);
//         expect(message).toBeInTheDocument()
//     })
// })