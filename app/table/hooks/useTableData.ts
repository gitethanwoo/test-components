import { useState, useCallback, useEffect } from 'react';
import { toast } from 'sonner';
import { initialData, statuses } from '../utils/constants';
import axios from 'axios';

export const useTableData = () => {
  const [data, setData] = useState(initialData);

  useEffect(() => {
    // Fetch initial data from the server
    axios.get('/api/data')
      .then(response => {
        setData(response.data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleStatusChange = useCallback((id: number, newStatus: string) => {
    return axios.put(`/api/data?id=${id}`, { status: newStatus })
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