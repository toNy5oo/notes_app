import useSWR from "swr"

const fetcher = (url: string) => fetch(url).then(res => res.json())

export function useFetcher (url: string, id?: string) {
    const { data, error, isLoading } = useSWR((id ? url+id : url), fetcher)
   
    return {
      data: data,
      isError: error,
      isLoading,
    }
  }