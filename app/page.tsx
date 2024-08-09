"use client";

import React, { useState, useCallback, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner"
import { statuses } from "./table/utils/constants";


import { Input } from "@/components/ui/input";
import { Send, LightbulbIcon, Smile } from "lucide-react";
import { MessageModal } from "@/components/MessageModal";
import ComboboxPopover from './table/components/ComboboxPopover';
import AddPersonForm from './table/components/AddPersonForm';
import { useTableData } from './table/hooks/useTableData';
import axios from 'axios';

// Add this type definition at the top of the file
type AIResponse = {
  insight: string;
  recommendation: string;
};

export default function DataTable() {
  const { data, setData, handleStatusChange } = useTableData();
  const [filteredData, setFilteredData] = useState(data);
  const [searchTerm, setSearchTerm] = useState("");
  const [messageModalOpen, setMessageModalOpen] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState<typeof data[0] | null>(null);
  const [aiResponse, setAiResponse] = useState<AIResponse | null>(null);

  const handleOpenMessageModal = useCallback((person: typeof data[0]) => {
    setSelectedPerson(person);
    setMessageModalOpen(true);
  }, []);

  const handleSendMessage = useCallback((message: string) => {
    if (selectedPerson) {
      axios.post('/api/send-message', {
        recipientId: selectedPerson.id,
        message
      })
        .then(() => {
          toast(`Message sent to ${selectedPerson.name}: ${message}`);
          setMessageModalOpen(false);
        })
        .catch(error => {
          console.error('Error:', error);
          toast.error('Failed to send message. Please try again.');
        });
    }
  }, [selectedPerson]);

  const handleStatusChangeWithToast = useCallback((id: number, newStatus: string) => {
    handleStatusChange(id, newStatus)
      .then(updatedItem => {
        toast(`${updatedItem.name}'s status changed to ${statuses.find(s => s.value === newStatus)?.label || newStatus}`);
      })
      .catch(() => {
        toast.error('Failed to update status. Please try again.');
      });
  }, [handleStatusChange]);

  const handleGetAIInsights = useCallback((person: typeof data[0]) => {
    const momInfo = `Name: ${person.name}, Status: ${person.status}, Agency: ${person.agency}, Referral Date: ${person.referralDate}`;
    axios.post('/api/wordware', { momInfo })
      .then((response) => {
        if (response.data.error) {
          throw new Error(response.data.error);
        }
        const aiGeneratedResponse = response.data.outputs || response.data;
        setAiResponse(aiGeneratedResponse as AIResponse);
        toast.success(`AI insights generated for ${person.name}`);
      })
      .catch(error => {
        console.error('Error:', error.response ? error.response.data : error.message);
        toast.error(`Failed to generate AI insights: ${error.response ? error.response.data.details : error.message}`);
      });
  }, []);

  useEffect(() => {
    // Fetch initial data from the server
    axios.get('/api/data')
      .then(response => {
        setData(response.data);
        setFilteredData(response.data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleAddPerson = useCallback((newPerson: Omit<typeof data[0], 'id'>) => {
    axios.post('/api/data', newPerson)
      .then(response => {
        const addedPerson = response.data;
        setData(prevData => [...prevData, addedPerson]);
        toast(`${addedPerson.name} has been added to the table.`);
      })
      .catch(error => console.error('Error adding person:', error));
  }, []);

  useEffect(() => {
    const filtered = data.filter(item =>
      Object.values(item).some(value =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setFilteredData(filtered);
  }, [data, searchTerm]);

  const handleSearch = useCallback((term: string) => {
    setSearchTerm(term);
    const filtered = data.filter(item =>
      Object.values(item).some(value =>
        value.toString().toLowerCase().includes(term.toLowerCase())
      )
    );
    setFilteredData(filtered);
  }, [data]);

  const handleExport = useCallback(() => {
    // Ensure consistent order of fields
    const fields = ['id', 'name', 'status', 'zip', 'referralDate', 'agency'];
    
    const csvContent = "data:text/csv;charset=utf-8," 
      + fields.join(",") + "\n"
      + data.map(row => 
        fields.map(field => 
          // Wrap values in quotes to handle potential commas
          `"${row[field as keyof typeof row]}"`
        ).join(",")
      ).join("\n");

    const encodedUri = encodeURI(csvContent);
    window.open(encodedUri);
  }, [data]);

  return (
    <div className="container mx-auto p-4 py-8">
      <Toaster />
      <div className="flex justify-between items-center mb-4">

        <div className="flex flex-col w-480px">
          <h1 className="text-2xl font-bold">A few key features</h1>
          <p className="text-sm">Add a person, change their status, search for a person, export to CSV, and send a message!</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={handleExport}>
            <Send className="mr-2 h-4 w-4" /> Export
          </Button>
          <AddPersonForm onSubmit={handleAddPerson} />
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
              <Input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
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
            {filteredData.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.name}</TableCell>
                <TableCell>
                  <ComboboxPopover
                    status={row.status}
                    onStatusChange={(newStatus) => handleStatusChangeWithToast(row.id, newStatus)}
                  />
                </TableCell>
                <TableCell className="hidden md:table-cell">{row.zip}</TableCell>
                <TableCell className="hidden md:table-cell">{row.referralDate}</TableCell>
                <TableCell className="hidden md:table-cell">{row.agency}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm" onClick={() => handleOpenMessageModal(row)}>
                    <Send className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleGetAIInsights(row)}>
                    <LightbulbIcon className="h-4 w-4" />
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
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">AI Insights</h2>
        {aiResponse ? (
          <div className="bg-white shadow-md border rounded-lg overflow-hidden">
            <div className="p-4">
              <h3 className="text-lg font-semibold">Recommendation:</h3>
              <p className="mt-2">{aiResponse.recommendation}</p>
            </div>
          </div>
        ) : (
          <p className="text-gray-500 italic">Send a message to a mom to get AI-generated insights.</p>
        )}
      </div>
      <MessageModal
        isOpen={messageModalOpen}
        onClose={() => setMessageModalOpen(false)}
        onSend={handleSendMessage}
        recipientName={selectedPerson?.name || ''}
      />
    </div>
  );
}