import {useEffect, useState} from 'react';
import { useQuery } from 'react-query';
import axios, {AxiosError} from 'axios';
import {UseFetchHook} from '~type/use-fetch-hook';

const useFetch = (url: string, key: string) => {

  	const queryOptions = {
	  retry: 2,
	  retryDelay: 300,
	  staleTime: 1000 * 60 * 60,
	};

	const [state, setState] = useState<UseFetchHook>({
		loading: true,
		error: false,
		data: null,
	})

	const getApiResponse = async () => {
		const response = await axios.get(url);
		return response.data;
	};

	const errorParser = (error: AxiosError): string => {
		if (error?.response) {
			return String(error.response.status);
		}
		if (error?.request) {
			return '400';
		}

		return '500';
	}

	const {data, error, isLoading} = useQuery({
		queryKey: key,
		queryFn: getApiResponse,
	  	...queryOptions,
	})


	useEffect(() => {
	  if (isLoading) {
			setState({
			  loading: true,
			  error: false,
			  data: null,
			})
	  }

	  if (error) {
			setState({
			  loading: false,
			  error: errorParser(error as AxiosError),
			  data: null,
			})
	  }

	  if (data) {
			setState({
			  loading: false,
			  error: false,
			  data: data,
			})
	  }

	}, [data, error, isLoading]);

	return state;
}

export default useFetch;