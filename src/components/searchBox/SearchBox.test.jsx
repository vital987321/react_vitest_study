import { it, expect, describe } from 'vitest'
import SearchBox from './SearchBox'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

describe('SearchBox', () => {
    it('renders component', () => {
        render(<SearchBox/>)
        const input=screen.getByPlaceholderText(/search/i)
        expect (input).toBeInTheDocument()
    })
    it('calls onChange function on enter with text', async () => {
        const onChange=vi.fn()
        render(<SearchBox onChange={onChange}/>)
        const user=userEvent.setup()
        const inputField=screen.getByPlaceholderText(/search/i)
        await user.type(inputField, 'SomeText{Enter}')
        expect(inputField).toHaveValue('SomeText')
        expect(onChange).toHaveBeenCalledOnce()
    })
    it('onChange is not called on enter if input is empty', async () => {
        const onChange=vi.fn()
        render(<SearchBox onChange={onChange}/>)
        const user=userEvent.setup()
        const inputField=screen.getByPlaceholderText(/search/i)
        await user.type(inputField, '{Enter}')
        expect(inputField).toHaveValue('')
        expect(onChange).not.toHaveBeenCalled()
    })
    
})