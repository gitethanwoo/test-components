import { useState, useCallback } from 'react';
import { toast } from 'sonner';
import { initialData, statuses } from '../utils/constants';
import axios from 'axios';

export const useTableData = () => {
  const [data, setData] = useState(initialData);

  const handleStatusChange = useCallback((id: number, newStatus: string) => {
    return axios.put(`http://localhost:3001/api/data/${id}/status`, { status: newStatus })
      .then(response => {
        setData(prevData => prevData.map(item =>
          item.id === id ? { ...item, status: newStatus } : item
        ));
        return response.data;
      })
      .catch(error => {
        console.error('Error updating status:', error);
        throw error;
      });
  }, []);

  return { data, setData, handleStatusChange };
};