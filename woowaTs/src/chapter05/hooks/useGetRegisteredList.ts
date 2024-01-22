import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { Bank, Card, PayMethodInfo } from "../payments";

type PayMethodType = PayMethodInfo<Bank> | PayMethodInfo<Card>;

export const useGetRegisteredList = (
  type: "card" | "appcard" | "bank"
): UseQueryResult<PayMethodType[]> => {
  const url = `baeminpay/code/${type === "appcard" ? "card" : "type"}`;
  const query = useQuery({
    queryKey: ["hello"],
    queryFn: async () => {
      const t = await fetch(url);
      const res = (await t.json()) as PayMethodType[];
      return res;
    },
  });

  return query;
};
