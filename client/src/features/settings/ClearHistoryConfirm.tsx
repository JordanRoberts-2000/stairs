import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui";
import { useActions } from "@/store";
import { toast } from "sonner";

const ClearHistoryConfirm = () => {
  const { clearUserHistory } = useActions();

  const handleConfirm = () => {
    const res = clearUserHistory();
    if (res.isOk()) {
      toast.info("History cleared");
    } else {
      toast.error(res.error ?? "Failed to clear history");
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="flex-1 bg-neutral-800">Clear History</Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="rounded-2xl">
        <AlertDialogHeader>
          <AlertDialogTitle>Clear history?</AlertDialogTitle>
          <AlertDialogDescription>
            This will remove all entries for the current operator. Targets and
            settings are preserved. This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction className="bg-neutral-800" onClick={handleConfirm}>
            Yes, clear it
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ClearHistoryConfirm;
