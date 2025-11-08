import { Button } from "@/components/ui";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useEntries } from "@/store";

const ViewStorageDialog = ({ children }: { children: React.ReactElement }) => {
  const entries = useEntries();
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-sm rounded-2xl">
        <DialogHeader>
          <DialogTitle>Local Storage</DialogTitle>
        </DialogHeader>
        <pre className="whitespace-pre rounded-2xl overflow-y-auto overflow-x-clip max-h-[60vh] border p-2 font-mono text-sm">
          {JSON.stringify(entries, null, 2)}
        </pre>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ViewStorageDialog;
