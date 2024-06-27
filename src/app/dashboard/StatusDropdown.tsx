import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { OrderStatus } from "@prisma/client";
import { Check, ChevronsUpDown } from "lucide-react";

const LABEL_MAP: Record<keyof typeof OrderStatus, string> = {
  awaiting_shipment: "Awaiting Shipment",
  fulfield: "Fulfield",
  shipped: "Shipped",
};

function StatusDropdown({
  id,
  orderStatus,
}: {
  id: string;
  orderStatus: OrderStatus;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="flex w-52 items-center justify-between"
        >
          {LABEL_MAP[orderStatus]}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-0">
        {Object.keys(OrderStatus).map((status) => (
          <DropdownMenuItem
            key={status}
            className={cn(
              "item-center flex cursor-default gap-1 p-2.5 text-sm hover:bg-zinc-100",
              { "bg-zinc-100": orderStatus === status },
            )}
          >
            <Check
              className={cn(
                "mr-2 h-4 w-4 text-primary",
                orderStatus === status ? "opasity-100" : "opacity-0",
              )}
            />
            {LABEL_MAP[status as OrderStatus]}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default StatusDropdown;
