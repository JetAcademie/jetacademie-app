import { useQuery } from "@tanstack/react-query";
import Axios from "../utils/axios.js";

export const useMonths = (gradeId) => {
  return useQuery({
    queryKey: ["months", gradeId],
    queryFn: async () => {
      if (!gradeId) return [];
      const response = await Axios.get(`months?gradeId=${gradeId}`);
      return response.data;
    },
    enabled: !!gradeId, // gradeId varsa sorguyu çalıştır
  });
};
