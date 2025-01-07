import { useQuery } from "@tanstack/react-query";
import Axios from "../utils/axios.js";

export const useGrades = () => {
  return useQuery({
    queryKey: ["grades"],
    queryFn: async () => {
      const response = await Axios.get("grades");
      return response.data;
    },
  });
};
