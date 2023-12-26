import axios from 'axios';
import { useEffect, useState } from 'react';

const useAxios = <T,>(url: string, initialValue: T) => {

     // States
     const [data, setData] = useState(initialValue);
     const [error, setError] = useState("");
     const [isLoading, setLoading] = useState(true);

     // Functions
     const fetchData = async () => {
          try {
               setLoading(true);
               const response = await axios.get(import.meta.env.VITE_BASE_URL + url);
               setData(response.data)
          } catch (err) {
               setError(err ? err.toString() : "error")
          }
          setLoading(false);
     };

     // Effects
     useEffect(() => {
          fetchData();
     }, [url]);

     return {
          data,
          refetch: () => fetchData(),
          setData,
          error,
          isLoading,
          setLoading,
          setError,
     };
};

export default useAxios;