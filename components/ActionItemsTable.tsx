import React, { useState } from "react"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationLink, PaginationNext } from "@/components/ui/pagination"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export interface ActionItem {
  id: number
  task: string
  person: string
  role: string
  type: 'session-report' | 'referral' | 'assessment'
}

interface ActionItemsTableProps {
  items: ActionItem[]
  itemsPerPage?: number
}

export function ActionItemsTable({ items, itemsPerPage = 5 }: ActionItemsTableProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const [viewMode, setViewMode] = useState<'table' | 'card'>('table')

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem)

  const totalPages = Math.ceil(items.length / itemsPerPage)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const TableView = () => (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Status</TableHead>
            <TableHead>Who?</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentItems.map((item) => (
            <TableRow key={item.id}>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Checkbox id={`item-${item.id}`} />
                  <label htmlFor={`item-${item.id}`} className="text-sm font-medium leading-none">
                    {item.task}
                  </label>
                </div>
              </TableCell>
              <TableCell>
                {item.person}
                <Badge variant="default" className="ml-2">
                  {item.role}
                </Badge>
              </TableCell>
              <TableCell className="text-right">Review</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )

  const CardView = () => (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {currentItems.map((item) => (
        <Card key={item.id}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Checkbox id={`card-item-${item.id}`} />
              <Badge variant="default">{item.role}</Badge>
            </div>
            <h3 className="text-lg font-semibold mb-1">{item.person}</h3>
            <p className="text-sm text-muted-foreground mb-4">{item.task}</p>
            <Button variant="outline" size="sm" className="w-full">Review</Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )

  return (
    <>
      <div className="mb-4 flex justify-end">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setViewMode(viewMode === 'table' ? 'card' : 'table')}
        >
          Switch to {viewMode === 'table' ? 'Card' : 'Table'} View
        </Button>
      </div>
      {viewMode === 'table' ? <TableView /> : <CardView />}
      <div className="flex items-center justify-between mt-4">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                href="#" 
                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <PaginationItem key={page}>
                <PaginationLink 
                  href="#" 
                  onClick={() => handlePageChange(page)}
                  isActive={currentPage === page}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext 
                href="#" 
                onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
        <div className="text-muted-foreground">
          Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, items.length)} of {items.length} items
        </div>
      </div>
    </>
  )
}