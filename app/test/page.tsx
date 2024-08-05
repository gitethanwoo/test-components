"use client";

import React from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Search, User, Users, BarChart2, UserPlus } from 'lucide-react'

const sidebarItems = [
  { icon: BarChart2, label: 'Dashboard' },
  { icon: Users, label: 'Your People', active: true },
  { icon: BarChart2, label: 'Tasks' },
  { icon: BarChart2, label: 'Reporting' },
  { icon: Users, label: 'Users' },
]

const bottomSidebarItems = [
  { icon: BarChart2, label: 'Support' },
  { icon: BarChart2, label: 'Settings' },
]

const tableData = [
  { advocate: "Shayne Keay", paired: 14, lesson: "Finance", center: "EMA - Pompano Beach", status: "Completed", date: "02/28/23" },
  { advocate: "Dianna Kastner", paired: 5, lesson: "SPICES", center: "EMA - Pompano Beach", status: "Completed", date: "1/31/14" },
  { advocate: "Stephanie Kluver", paired: 9, lesson: "Empathy", center: "EMA - Pompano Beach", status: "Completed", date: "7/11/19" },
  { advocate: "Ava Kassing", paired: 1, lesson: "Anger", center: "EMA - Pompano Beach", status: "Completed", date: "5/19/12" },
  { advocate: "Gina Brown", paired: 11, lesson: "Caring", center: "EMA - Pompano Beach", status: "Completed", date: "1/28/17" },
  { advocate: "Acoya Krempin", paired: 7, lesson: "Relating", center: "EMA - Pompano Beach", status: "Active", date: "5/30/14" },
  { advocate: "MariaJose Rhye", paired: 6, lesson: "Basics", center: "EMA - Pompano Beach", status: "Active", date: "7/18/17" },
  { advocate: "Anne Smith", paired: 19, lesson: "Mothering", center: "EMA - Pompano Beach", status: "Active", date: "8/15/17" },
  { advocate: "Susan Juris", paired: 3, lesson: "Sleep", center: "EMA - Pompano Beach", status: "Active", date: "5/7/16" },
  { advocate: "Olivia Jules", paired: 4, lesson: "Finance", center: "EMA - Pompano Beach", status: "Active", date: "5/27/15" },
]

const EMAPeopleDashboard = () => {
  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 p-4 flex flex-col justify-between">
        <div>
          <img src="/ema-logo.png" alt="EMA Logo" className="h-8 mb-8" />
          <Input className="mb-4" placeholder="Search" />
          {sidebarItems.map((item, index) => (
            <Button
              key={index}
              variant={item.active ? "secondary" : "ghost"}
              className="w-full justify-start mb-1"
            >
              <item.icon className="mr-2 h-4 w-4" />
              {item.label}
            </Button>
          ))}
        </div>
        <div>
          {bottomSidebarItems.map((item, index) => (
            <Button
              key={index}
              variant="ghost"
              className="w-full justify-start mb-1"
            >
              <item.icon className="mr-2 h-4 w-4" />
              {item.label}
            </Button>
          ))}
          <div className="flex items-center mt-4">
            <User className="h-8 w-8 rounded-full bg-gray-200 p-1 mr-2" />
            <div>
              <div className="text-sm font-medium">Olivia Rhye</div>
              <div className="text-xs text-gray-500">olivia@untitledui.com</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Your People</h1>
          <div className="flex items-center space-x-2">
            <Button variant="outline">
              <Search className="mr-2 h-4 w-4" /> Export
            </Button>
            <Button>
              <UserPlus className="mr-2 h-4 w-4" /> Add person
            </Button>
          </div>
        </div>
        <p className="text-gray-500 mb-6">Find your Advocates, Moms, and Groups all in one place.</p>
        <div className="flex justify-between items-center mb-4">
          <div className="flex space-x-2">
            <Button variant="secondary">Advocates</Button>
            <Button variant="ghost">Moms</Button>
            <Button variant="ghost">Groups</Button>
          </div>
          <div className="flex space-x-2">
            <Input placeholder="Search" className="w-64" />
            <Button variant="outline">Columns</Button>
            <Button variant="outline">Filters</Button>
          </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Group Advocate</TableHead>
              <TableHead>Paired Moms</TableHead>
              <TableHead>Current Lesson</TableHead>
              <TableHead>Center</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Start date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tableData.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.advocate}</TableCell>
                <TableCell>{row.paired}</TableCell>
                <TableCell>{row.lesson}</TableCell>
                <TableCell>{row.center}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs ${row.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                    {row.status}
                  </span>
                </TableCell>
                <TableCell>{row.date}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View details</DropdownMenuItem>
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="flex justify-between items-center mt-4">
          <Button variant="outline" disabled>Previous</Button>
          <span>Page 1 of 10</span>
          <Button variant="outline">Next</Button>
        </div>
      </div>
    </div>
  );
};

export default EMAPeopleDashboard;