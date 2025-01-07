import { useQuery } from "@tanstack/react-query";
import Axios from "../utils/axios.js";

export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await Axios.get("categories");
      return response.data;
    },
  });
};
