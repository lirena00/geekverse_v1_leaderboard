"use client";

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
import updateDomain from "~/server/actions";

export function DomainForm({ teams }: { teams: { name: string }[] }) {
  const [loading, setLoading] = useState(false);
  const [teamOpen, setTeamOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedDomain, setSelectedDomain] = useState<string | null>(null);
  const [selectedTeam, setSelectedTeam] = useState<{ name: string } | null>(
    null,
  );
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await updateDomain(selectedTeam?.name ?? "", selectedDomain ?? "");
    setSelectedDomain(null);
    setSelectedTeam(null);
    setLoading(false);
  };
  const domains = ["Security", "Health", "Education", "Defense", "Logistics"];
  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="w-[450px] space-y-4 rounded-lg border p-4"
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

        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              className="w-full justify-between"
            >
              {selectedDomain ? selectedDomain : "Select Domain"}
              <ChevronsUpDown className="opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="w-full min-w-[var(--radix-popover-trigger-width)] p-0"
            align="start"
          >
            <Command>
              <CommandInput placeholder="Search domain..." className="h-9" />
              <CommandList>
                <CommandEmpty>No domain found.</CommandEmpty>
                <CommandGroup>
                  {domains.map((domain) => (
                    <CommandItem
                      key={domain}
                      onSelect={() => {
                        setSelectedDomain(domain);
                        setOpen(false);
                      }}
                    >
                      {domain}
                      <Check
                        className={cn(
                          "ml-auto",
                          selectedDomain === domain
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

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Submitting" : "Submit"}
        </Button>
      </form>
    </div>
  );
}
