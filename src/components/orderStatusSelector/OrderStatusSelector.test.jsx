import { render, screen } from '@testing-library/react';
import { it, expect, describe, vi } from 'vitest'
import OrderStatusSelector from './OrderStatusSelector';
import { Theme } from '@radix-ui/themes';
import userEvent from '@testing-library/user-event';

describe('OrderStatusSelector', () => {
    const renderComponent = () => {
        const onChange = vi.fn();
        const user = userEvent.setup();
        render(
          <Theme>
            <OrderStatusSelector onChange={onChange} />
          </Theme>
        );

        return {
          onChange,
          trigger: screen.getByRole("combobox"),
            user,
          getOptions: ()=>screen.findAllByRole("option"),
        };
    }

    it("should render New as the default value", () => {
        const { trigger } = renderComponent();
        expect(trigger).toHaveTextContent(/new/i)
    });

    it("should render correct statuses", async () => {
        const { trigger, user, getOptions } = renderComponent();
        await user.click(trigger)
        const options = await getOptions()
        expect(options).toHaveLength(3);
        const labels=options.map((option)=>option.textContent)
        expect(labels).toEqual(["New", "Processed", "Fulfilled"]);
    });

    it("onChange receives correct velue on clicking option 'Processed'", async () => {
      const { trigger, onChange, user, getOptions } = renderComponent();
      await user.click(trigger);
      const options = await getOptions();
      const option = screen.getByRole("option", { name: /processed/i });
      await user.click(option);
      expect(onChange).toHaveBeenCalledWith("processed");
    });
})