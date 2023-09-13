import { FC, useState } from "react";
import { createActivity } from "../server-actions/create-activity";
import { Input } from "../../../common/components/ui/input";
import { CornerDownLeft, Loader2 } from "lucide-react";
import { Button } from "../../../common/components/ui/button";
import { PlusIcon } from "@radix-ui/react-icons";

interface Props {
  locationId: number;
}

export const ActivityCreator: FC<Props> = ({ locationId }) => {
  const [loading, setLoading] = useState(false);

  const handleCreateActivity = async (data: FormData) => {
    const description = data.get("description") as string;
    if (!description) return;
    setLoading(true);
    try {
      await createActivity(locationId, description);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative group">
      <form action={handleCreateActivity}>
        <Input className="bg-muted shadow p-8 text-md font-medium" placeholder="Describe an activity you want to track." name="description" />
        <div className="absolute right-2 top-2 bottom-2 flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground opacity-0 -translate-x-2 group-focus-within:opacity-100 group-focus-within:translate-x-0 transition">
            <span>Enter</span>
            <CornerDownLeft size={18} className="text-muted-foreground" />
          </div>
          <Button type="submit" className="gap-4 h-full">
            <PlusIcon /> Track activity
            {loading && <Loader2 className="animate-spin" />}
          </Button>
        </div>
      </form>
    </div>
  );
};
