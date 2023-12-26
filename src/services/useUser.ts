import axios from 'axios';
import { useEffect, useState } from 'react';
import { IUser } from '../types';
import useAxios from './useAxios';
import toast from 'react-hot-toast';

const initialValue: IUser = {
     name: "",
     sector_id: 0,
     is_agreed: false,
};

const url = "users"

const useUser = () => {

     // States
     const [user, setUser] = useState(initialValue);

     // Queries
     const { data = { data: [] }, isLoading, refetch, setLoading, error, setError } = useAxios<IUser[]>(url, [initialValue])

     // Effects
     useEffect(() => {
          if ("data" in data && data.data.length) {
               setUser(data.data[0])
          }
     }, [data])


     // Functions

     const postData = (data: IUser) => {
          setLoading(true);
          const toastLoading = toast.loading('Sending...');
          
          axios.post(import.meta.env.VITE_BASE_URL + url, data)
               .then(() => {
                    refetch()
                    toast.dismiss(toastLoading);
                    toast.success('Successfully updated!', {
                         icon: '👏',
                    });
                    setLoading(false);
               })
               .catch((err) => {
                    toast.dismiss(toastLoading);
                    toast.error('Error!');
                    setError(err)
               });
     }

     return {
          user,
          refetch,
          setUser,
          error,
          postData,
          isFetchingUsers: isLoading,
     };
};

export default useUser;