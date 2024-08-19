'use client'

import React, { useState } from "react"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Search, LayoutDashboard, Users, Workflow, FileText, Power, UserPlus, LogIn, Menu, X } from 'lucide-react'
import { ActionItemsTable, ActionItem } from "@/components/ActionItemsTable"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { PlusCircle } from 'lucide-react'

// Mock data
const actionItems = [
  { id: 1, task: "Review Session Report", person: "Ava Kassing", role: "Advocate", type: 'session-report' },
  { id: 2, task: "Review Session Report", person: "Emma Thompson", role: "Advocate", type: 'session-report' },
  { id: 3, task: "Review Referral", person: "Dianna Kastner", role: "Mom", type: 'referral' },
  { id: 4, task: "Review Referral", person: "Sarah Johnson", role: "Mom", type: 'referral' },
  { id: 5, task: "Send pre-assessment", person: "Lisa Brown", role: "Mom", type: 'assessment' },
  { id: 6, task: "Send post-assessment", person: "Rachel Green", role: "Mom", type: 'assessment' },
]

export function Dashboard() {

  const NavLinks = () => (
    <>
      <Link href="#" className="flex items-center gap-2 text-lg font-semibold" prefetch={false}>
        <LayoutDashboard className="w-6 h-6" />
        <span>Dashboard</span>
      </Link>
      <Link href="#" className="flex items-center gap-2 text-lg font-semibold" prefetch={false}>
        <Users className="w-6 h-6" />
        <span>Your People</span>
      </Link>
      <Link href="#" className="flex items-center gap-2 text-lg font-semibold" prefetch={false}>
        <Workflow className="w-6 h-6" />
        <span>Tasks</span>
      </Link>
      <Link href="#" className="flex items-center gap-2 text-lg font-semibold" prefetch={false}>
        <FileText className="w-6 h-6" />
        <span>Reporting</span>
      </Link>
      <Link href="#" className="flex items-center gap-2 text-lg font-semibold" prefetch={false}>
        <Users className="w-6 h-6" />
        <span>Users</span>
      </Link>
      <Link href="#" className="flex items-center gap-2 text-lg font-semibold" prefetch={false}>
        <Power className="w-6 h-6" />
        <span>Support</span>
      </Link>
    </>
  )

  return (
    <div className="flex flex-col lg:flex-row min-h-screen max-w-screen-2xl mx-auto w-full">
      <div className="hidden lg:block lg:w-[280px] xl:w-[280px] xl:min-w-[200px] xl:max-w-[280px] border-r">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <span className="text-2xl font-bold">logo</span>
            </Link>
            <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
              <Search className="h-4 w-4" />
              <span className="sr-only">Toggle notifications</span>
            </Button>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium">
              <NavLinks />
            </nav>
          </div>
        </div>
      </div>
      <div className="flex-grow flex flex-col min-w-0">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 lg:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                <Link
                  href="#"
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                  <span className="text-2xl font-bold">logo</span>
                </Link>
                <NavLinks />
              </nav>
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1">
            <form>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search..."
                  className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                />
              </div>
            </form>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <Users className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <header className="flex flex-wrap items-start lg:items-center justify-between mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold">Welcome back, Olivia</h1>
              <p className="text-muted-foreground">
                Get the latest updates on your moms, session reports, and upcoming tasks.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4 mt-4 lg:mt-0">
              <Button variant="outline">Export</Button>
              <Button>Log an interaction</Button>
            </div>
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {[
              { icon: PlusCircle, title: "Add a Mom", description: "Add new or import from CSV" },
              { icon: UserPlus, title: "Add an Advocate", description: "Add new or import from CSV" },
              { icon: LogIn, title: "Log an Interaction", description: "Start a contact log" },
            ].map((item, index) => (
              <div key={index} className="bg-white border rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <button className="w-full h-full p-4 text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <item.icon className="w-10 h-10 text-blue-500" />
                    </div>
                    <div className="flex-grow">
                      <h2 className="text-lg font-semibold text-gray-900">{item.title}</h2>
                      <p className="text-sm text-gray-500">{item.description}</p>
                    </div>
                  </div>
                </button>
              </div>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Action Items</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="view-all">
                <TabsList className="flex-wrap">
                  <TabsTrigger value="view-all">View All ({actionItems.length})</TabsTrigger>
                  <TabsTrigger value="session-reports">Session Reports ({actionItems.filter(item => item.type === 'session-report').length})</TabsTrigger>
                  <TabsTrigger value="referrals">Referrals ({actionItems.filter(item => item.type === 'referral').length})</TabsTrigger>
                  <TabsTrigger value="assessments">Assessments ({actionItems.filter(item => item.type === 'assessment').length})</TabsTrigger>
                </TabsList>
                <TabsContent value="view-all">
                  <ActionItemsTable items={actionItems as ActionItem[]} />
                </TabsContent>
                <TabsContent value="session-reports">
                  <ActionItemsTable items={actionItems.filter(item => item.type === 'session-report') as ActionItem[]} />
                </TabsContent>
                <TabsContent value="referrals">
                  <ActionItemsTable items={actionItems.filter(item => item.type === 'referral') as ActionItem[]} />
                </TabsContent>
                <TabsContent value="assessments">
                  <ActionItemsTable items={actionItems.filter(item => item.type === 'assessment') as ActionItem[]} />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}

export default Dashboard