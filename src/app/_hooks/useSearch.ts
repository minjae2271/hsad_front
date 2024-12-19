import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { getSearch } from "../_lib/getSearch";
import { ProductData } from "@/models/search";

type searchProps = {
    search_query: string;
    how_many: string
}

export function useSearch(handleRandomCoverSuccess: (asins: ProductData) => void) {
  const { mutate, isPending } = useMutation({
    mutationFn: (searchProps: searchProps) => getSearch(searchProps),
    onSuccess: (data: ProductData) => {
        console.log(data)
        handleRandomCoverSuccess(data)
        toast.success("Search products successful");
    },
    onError: () => {
        toast.error("Search products failed");
    },
  });
  return { mutate, isPending };
}
