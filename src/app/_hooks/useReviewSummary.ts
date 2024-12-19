import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { getReviewSummary } from "../_lib/getReviewSummary";
import { ProductData } from "@/models/search";


export function useReviewSummary(handleRandomCoverSuccess: (asins: ProductData) => void) {
  const { mutate, isPending } = useMutation({
    mutationFn: (asins: ProductData) => getReviewSummary(asins),
    onSuccess: (data: ProductData) => {
        console.log(data)
        handleRandomCoverSuccess(data)
        toast.success("Create Review Summary successful");
    },
    onError: () => {
        toast.error("Create Review Summary failed");
    },
  });
  return { mutate, isPending };
}
