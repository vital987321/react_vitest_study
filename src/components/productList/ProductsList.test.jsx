import { render, screen } from "@testing-library/react";
import ProductList from "./ProductList";
import { server } from "../../tests/mocks/server";
import { http, HttpResponse } from "msw";

describe('ProductList', () => {
    it('should render a list of fetched products', async () => {
        render(<ProductList />)
        const products = await screen.findAllByRole('listitem')
        expect(products.length).toBeGreaterThan(0)
    })
    it('should render "no products" if empty array is fetched', async () => {
        server.use(http.get('/products', ()=>HttpResponse.json([])))
        render(<ProductList />)
        const message = await screen.findByText(/no products/i);
        expect(message).toBeInTheDocument()
    })
})