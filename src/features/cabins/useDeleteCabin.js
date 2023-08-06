import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { deleteCabin as deleteCabinApi } from "../../services/apiCabins";

//we had 2 hooks: usequeryclient and usemutations, that's why it's a good idea to create a customhook!

export function useDeleteCabin() {
  const queryClient = useQueryClient();

  const { isLoding: isDeleting, mutate: deleteCabin } = useMutation({
    // this is the react query will call. We make this an arrow function that receives an id and then call de deleteCabin function.
    // mutationFn: (id) => deleteCabin(id),
    //actually since we are inputting the same value that we are calling here... it's the same thing (without id and wihtout arrow function):
    mutationFn: deleteCabinApi,
    onSuccess: () => {
      toast.success("cabin successsuflly deleted!");
      // once success we want to refetch the data. (once invalidate it fetches again)
      queryClient.invalidateQueries({
        // see this 'cabins' name is in CabinTable.jsx...
        queryKey: ["cabins"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteCabin };
}
