import { toast } from "sonner";
import { AxiosRequestConfig } from "axios";
import useDynamicMutation from "@/api/use-post-data";
import { DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type Props = {
    url: string;
    body: {
        [key: string]: string | number | boolean | object | string[] | undefined;
    };
    headers?: { [key: string]: string };
    method?: AxiosRequestConfig["method"];
    onSuccess?: () => void;
    title: string;
    description?: string;
    successMessage?: string;
    optional?: boolean;
    queryKey?: string[];
    isApprove?: boolean;
};
const ConfirmationModal = ({
    url,
    body,
    title,
    description,
    successMessage,
    headers,
    method = "POST",
    onSuccess,
}: Props) => {
    const postMutation = useDynamicMutation({});
    const approveRequestSubmitHandler = async () => {
        try {
            await postMutation.mutateAsync({
                url: url,
                method,
                headers,
                body,
                onSuccess: () => {
                    toast.success(successMessage);
                    onSuccess?.();
                },
            });
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center space-y-5">
            <div>
                <h2 className="font-semibold text-lg">
                    {title}
                </h2>
                <p className="font-normal text-center">{description}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-3 mt-5 w-full">
                <DialogClose className={"border rounded-md"}>
                    <Button variant={"secondary"} size={"lg"} className="w-full h-full cursor-pointer py-1.5">
                        Cancel
                    </Button>
                </DialogClose>
                <Button
                    type="button"
                    onClick={() => approveRequestSubmitHandler()}
                    variant={"primary"}
                    size={"lg"}
                    disabled={postMutation.isPending}
                    className={"py-1.5"}
                >
                    {postMutation.isPending ? "Submitting..." : "Submit"}
                </Button>
            </div>

        </div>
    );
};

export default ConfirmationModal;
