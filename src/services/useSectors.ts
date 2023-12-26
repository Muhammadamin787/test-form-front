import { ISector } from '../types';
import useAxios from './useAxios';

const useSectors = () => {

     // Queries
     const { data, error, isLoading, refetch, setData } = useAxios<ISector[]>("sectors", [])

     return {
          sectors: data,
          refetch,
          setData,
          error,
          isFetchingSectors: isLoading,
     };
};

export default useSectors;