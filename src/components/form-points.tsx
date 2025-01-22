"use client";

import { updatePoints } from "~/server/actions";
import { useState, useTransition } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import {
  Check,
  ChevronsUpDown,
  Loader,
  CheckCircle,
  XCircle,
} from "lucide-react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "~/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "~/components/ui/command";
import { cn } from "~/lib/utils";

const pointTypes = [
  { key: "round_one", label: "Round 1" },
  { key: "round_two", label: "Round 2" },
  { key: "bounty", label: "Bounty" },
];

export function PointsForm({ teams }: { teams: { name: string }[] }) {
  const [selectedTeam, setSelectedTeam] = useState<{ name: string } | null>(
    null,
  );
  const [selectedPointType, setSelectedPointType] = useState<string | null>(
    null,
  );
  const [points, setPoints] = useState<string>("");
  const [comments, setComments] = useState<string>("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [isPending, startTransition] = useTransition();
  const [teamOpen, setTeamOpen] = useState(false);
  const [pointOpen, setPointOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    startTransition(async () => {
      await updatePoints(
        selectedTeam?.name ?? "",
        selectedPointType ?? "",
        Number(points),
        comments,
      );
    });
    setStatus("success");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md space-y-4 rounded-lg border p-4"
    >
      <Popover open={teamOpen} onOpenChange={setTeamOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            className="w-full justify-between"
          >
            {selectedTeam ? selectedTeam.name : "Select Team"}
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-full min-w-[var(--radix-popover-trigger-width)] p-0"
          align="start"
        >
          <Command>
            <CommandInput placeholder="Search team..." className="h-9" />
            <CommandList>
              <CommandEmpty>No team found.</CommandEmpty>
              <CommandGroup>
                {teams.map((team) => (
                  <CommandItem
                    key={team.name}
                    onSelect={() => {
                      setSelectedTeam(team);
                      setTeamOpen(false);
                    }}
                  >
                    {team.name}
                    <Check
                      className={cn(
                        "ml-auto",
                        selectedTeam?.name === team.name
                          ? "opacity-100"
                          : "opacity-0",
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      <Popover open={pointOpen} onOpenChange={setPointOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            className="w-full justify-between"
          >
            {selectedPointType
              ? pointTypes.find((p) => p.key === selectedPointType)?.label
              : "Select Point Type"}
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-full min-w-[var(--radix-popover-trigger-width)] p-0"
          align="start"
        >
          <Command>
            <CommandList>
              <CommandEmpty>No point type found.</CommandEmpty>
              <CommandGroup>
                {pointTypes.map(({ key, label }) => (
                  <CommandItem
                    key={key}
                    onSelect={() => {
                      setSelectedPointType(key);
                      setPointOpen(false);
                    }}
                  >
                    {label}
                    <Check
                      className={cn(
                        "ml-auto",
                        selectedPointType === key ? "opacity-100" : "opacity-0",
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      <Input
        type="number"
        value={points}
        onChange={(e) => setPoints(e.target.value)}
        placeholder="Enter points"
        required
      />

      <Textarea
        value={comments}
        onChange={(e) => setComments(e.target.value)}
        placeholder="Add comments (optional)"
      />

      <Button type="submit" disabled={isPending} className="w-full">
        {isPending ? <Loader className="animate-spin" /> : "Submit"}
      </Button>

      {status === "success" && (
        <div className="flex items-center text-sm text-green-500">
          <CheckCircle className="mr-2 h-4 w-4" /> Points updated!
        </div>
      )}
      {status === "error" && (
        <div className="flex items-center text-sm text-red-500">
          <XCircle className="mr-2 h-4 w-4" /> Failed to update.
        </div>
      )}
    </form>
  );
}
