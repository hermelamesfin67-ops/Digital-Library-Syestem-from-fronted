import { useSession } from "next-auth/react";

type HeaderType = "FormData" | "Json";
interface Props {
  type?: HeaderType;
  isPublic?: boolean;
}
export const useGetHeaders = ({ isPublic, type = "Json" }: Props) => {
  const { data: session } = useSession()
  if (type === "FormData") {
    return {
      "Content-Type": "multipart/form-data",
      Accept: "application/json",
      Authorization: `Bearer ${session?.user.access}`,
    };
  } else if (isPublic) {
    return {
      "Content-Type": "application/json",
      Accept: "application/json",
    };
  }
  else {
    return {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${session?.user.access}`,
    };
  }
};
