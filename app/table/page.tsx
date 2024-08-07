"use client";

import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Toaster, toast } from "sonner";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Send, MoreHorizontal } from "lucide-react";
import { cva } from "class-variance-authority";

type Status = {
  value: string
  label: string
}

const statuses: Status[] = [
  { value: "prospective_mom", label: "Prospective Mom" },
  { value: "waiting_pre_assessment", label: "Waiting for Pre-Assessment" },
  { value: "waiting_to_be_paired", label: "Waiting to be Paired" },
  { value: "paired_with_advocate", label: "Paired with Advocate" },
  { value: "group_classes", label: "Group Classes" },
  { value: "completed", label: "Completed" },
  { value: "false_start", label: "False Start" },
  { value: "paused", label: "Paused" },
  { value: "discharged", label: "Discharged" },
  { value: "served_wo_program", label: "Served w/o Program Engagement" }
];

const initialData = [
  { id: 1, name: "Ava Kassing", status: "false_start", zip: "33064", referralDate: "02/28/23", agency: "Child Protective Services" },
  { id: 2, name: "Dianna Kastner", status: "prospective_mom", zip: "33069", referralDate: "1/31/14", agency: "Hope Women's Center" },
  { id: 3, name: "Olivia Jules", status: "waiting_pre_assessment", zip: "33319", referralDate: "7/11/19", agency: "Childnet" },
  { id: 4, name: "Emma Johnson", status: "waiting_to_be_paired", zip: "33069", referralDate: "5/19/12", agency: "His Caring Place" },
  { id: 5, name: "Anne Smith", status: "discharged", zip: "33068", referralDate: "1/28/17", agency: "Child Protective Services" },
];

type StatusColor = {
  [key: string]: string;
};

const statusColors: StatusColor = {
  false_start: "bg-gray-50",
  prospective_mom: "bg-blue-50",
  waiting_pre_assessment: "bg-yellow-50",
  waiting_to_be_paired: "bg-red-50",
  paired_with_advocate: "bg-green-50",
  paused: "bg-gray-50",
  discharged: "bg-gray-50",
  completed: "bg-gray-50",
  served_wo_program: "bg-pink-50",
  group_classes: "bg-indigo-50",
};

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

export default function DataTable() {
  const [data, setData] = useState(initialData);
  const toastRef = useRef<{ [key: number]: boolean }>({});

  const handleStatusChange = useCallback((id: number, newStatus: string) => {
    setData(prevData => {
      const updatedData = prevData.map(item =>
        item.id === id ? { ...item, status: newStatus } : item
      );
      const updatedItem = updatedData.find(item => item.id === id);
      if (updatedItem && !toastRef.current[id]) {
        toast(`${updatedItem.name}'s status changed to ${statuses.find(s => s.value === newStatus)?.label || newStatus}`);
        toastRef.current[id] = true;
        setTimeout(() => {
          toastRef.current[id] = false;
        }, 100);
      }
      return updatedData;
    });
  }, []);

  return (
    <div className="container mx-auto p-4">
      <Toaster />
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">This is meant to demonstrate the status change interaction!</h1>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Send className="mr-2 h-4 w-4" /> Export
          </Button>
          <Button>
            + Add person
          </Button>
        </div>
      </div>
      <div className="bg-white shadow-md border rounded-lg overflow-hidden">
        <div className="p-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
            <div className="flex space-x-2 w-full md:w-auto">
              <Button variant="outline">Advocates</Button>
              <Button variant="outline">Moms</Button>
              <Button variant="outline">Groups</Button>
            </div>
            <div className="flex flex-wrap space-x-2 w-full md:w-auto">
              <input
                type="text"
                placeholder="Search"
                className="px-3 py-1 border rounded-md mb-2 md:mb-0 w-full md:w-auto"
              />
              <Button variant="outline" className="mb-2 md:mb-0">
                Columns
              </Button>
              <Button variant="outline" className="mb-2 md:mb-0">
                Filters
              </Button>
            </div>
          </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Mom Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden md:table-cell">Zip</TableHead>
              <TableHead className="hidden md:table-cell">Referral Date</TableHead>
              <TableHead className="hidden md:table-cell">Agency</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.name}</TableCell>
                <TableCell>
                  <ComboboxPopover
                    status={row.status}
                    onStatusChange={(newStatus) => handleStatusChange(row.id, newStatus)}
                  />
                </TableCell>
                <TableCell className="hidden md:table-cell">{row.zip}</TableCell>
                <TableCell className="hidden md:table-cell">{row.referralDate}</TableCell>
                <TableCell className="hidden md:table-cell">{row.agency}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm">
                    <Send className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="p-4 border-t flex justify-between items-center">
          <Button variant="outline" disabled>
            Previous
          </Button>
          <span>Page 1 of 10</span>
          <Button variant="outline">
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}