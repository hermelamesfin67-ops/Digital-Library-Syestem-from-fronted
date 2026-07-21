type HeaderType = "FormData" | "Json";
interface Props {
  type?: HeaderType;
  noEnc?: boolean;
}
export const useGetHeaders = ({ type = "Json" }: Props) => {
  if (type === "FormData") {
    return {
      "Content-Type": "multipart/form-data",
      Accept: "application/json",
      Authorization: `Bearer `,
    };
  } else {
    return {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer `,
     
    };
  }
};
