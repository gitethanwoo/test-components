"use client"

import React, { useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Component() {
  const [selectedPerson, setSelectedPerson] = useState("All")

  const fullData = [
    {
      name: 'Emma',
      "Prospective": 3,
      "Pre-Assessment": 2,
      "Group Class": 6,
      "Pairing": 1,
      "Active": 12,
      "Post-Assessment": 3,
    },
    {
      name: 'Liam',
      "Prospective": 2,
      "Pre-Assessment": 4,
      "Group Class": 5,
      "Pairing": 2,
      "Active": 10,
      "Post-Assessment": 1,
    },
    {
      name: 'Olivia',
      "Prospective": 4,
      "Pre-Assessment": 1,
      "Group Class": 7,
      "Pairing": 0,
      "Active": 15,
      "Post-Assessment": 2,
    },
    {
      name: 'Noah',
      "Prospective": 1,
      "Pre-Assessment": 3,
      "Group Class": 4,
      "Pairing": 3,
      "Active": 8,
      "Post-Assessment": 4,
    },
  ]

  const data = selectedPerson === "All" ? fullData : fullData.filter(item => item.name === selectedPerson)

  const colors = [
    'hsl(var(--chart-1))',
    'hsl(var(--chart-2))',
    'hsl(var(--chart-3))',
    'hsl(var(--chart-4))',
    'hsl(var(--chart-5))',
    'hsl(var(--chart-6))',
  ]

  const renderColorfulLegendText = (value: string) => {
    return <span className="text-sm text-textprimary">{value}</span>
  }

  return (
    <Card className="w-[640px]">
      <CardHeader>
        <CardTitle>Workload Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="w-full">
          <ResponsiveContainer width="100%" height={240}>
            <BarChart
              data={data}
              layout="vertical"
              margin={{ top: 20, right: 20, left: 0, bottom: 5 }}
            >
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" width={60} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '4px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}
                labelStyle={{ color: 'hsl(var(--textprimary))' }}
                itemStyle={{ color: 'hsl(var(--textprimary))' }}
              />
              <Legend
                layout="vertical"
                verticalAlign="middle"
                align="right"
                wrapperStyle={{ paddingLeft: '10px' }}
                formatter={renderColorfulLegendText}
              />
              <Bar dataKey="Prospective" stackId="a" fill={colors[0]} maxBarSize={480} />
              <Bar dataKey="Pre-Assessment" stackId="a" fill={colors[1]} maxBarSize={480} />
              <Bar dataKey="Group Class" stackId="a" fill={colors[2]} maxBarSize={480} />
              <Bar dataKey="Pairing" stackId="a" fill={colors[3]} maxBarSize={480} />
              <Bar dataKey="Active" stackId="a" fill={colors[4]} maxBarSize={480} />
              <Bar dataKey="Post-Assessment" stackId="a" fill={colors[5]} maxBarSize={480} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 flex justify-left">
          <Select onValueChange={setSelectedPerson} defaultValue="All">
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select a person" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All</SelectItem>
              {fullData.map((item) => (
                <SelectItem key={item.name} value={item.name}>
                  {item.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  )
}