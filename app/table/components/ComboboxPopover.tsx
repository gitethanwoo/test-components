import React from 'react';
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cva } from "class-variance-authority";
import { statuses, statusColors } from '../utils/constants';

// ... (import statuses and statusColors from a separate file)

function ComboboxPopover({ status, onStatusChange }: { status: string, onStatusChange: (value: string) => void }) {
  const [open, setOpen] = React.useState(false);
  const selectedStatus = statuses.find(s => s.value === status) || statuses[0];

  const triggerButtonVariants = cva(
    "justify-start text-left font-normal",
    {
      variants: {
        variant: statusColors
      },
    }
  );

  const popoverItemVariants = cva(
    "justify-start text-left font-normal mb-1 py-2 px-3 cursor-pointer hover:bg-gray-100",
    {
      variants: {
        variant: statusColors
      },
    }
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={triggerButtonVariants({ variant: status })}
        >
          {selectedStatus.label}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0" side="bottom" align="start">
        <Command>
          <CommandInput placeholder="Change status..." className="border-none focus:ring-0" />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {statuses.map((s) => (
                <CommandItem
                  key={s.value}
                  value={s.value}
                  onSelect={(value) => {
                    onStatusChange(value);
                    setOpen(false);
                  }}
                  className={popoverItemVariants({ variant: s.value })}
                >
                  <span>{s.label}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export default ComboboxPopover;