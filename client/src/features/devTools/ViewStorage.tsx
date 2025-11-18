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
import { useStore } from "@/store/store";

const ViewStorageDialog = ({ children }: { children: React.ReactElement }) => {
  const context = useStore((state) => state.context);

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-sm rounded-2xl">
        <DialogHeader>
          <DialogTitle>Local Storage</DialogTitle>
        </DialogHeader>
        <pre className="max-h-[60vh] overflow-x-clip overflow-y-auto rounded-2xl border p-2 font-mono text-sm whitespace-pre">
          {JSON.stringify(context, null, 2)}
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
