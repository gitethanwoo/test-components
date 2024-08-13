import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface AssignCoordinatorDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onAssign: (coordinator: string, location: string) => void;
}

const coordinators = {
  "Virtual": ["Mark Johnson", "Mike Brown"],
  "New York Office": ["Jane Smith", "Emma Davis"],
  "Los Angeles Office": ["John Doe", "Alice Wilson"],
  "Chicago Office": ["Bob Williams", "Charlie Lee"],
  "Houston Office": ["David Kim", "Eva Martin"],
};

const locations = Object.keys(coordinators);

const AssignCoordinatorDialog: React.FC<AssignCoordinatorDialogProps> = ({ isOpen, onOpenChange, onAssign }) => {
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedCoordinator, setSelectedCoordinator] = useState("");
  const [locationOpen, setLocationOpen] = useState(false);
  const [coordinatorOpen, setCoordinatorOpen] = useState(false);

  const handleLocationSelect = (value: string) => {
    setSelectedLocation(value);
    setSelectedCoordinator(""); // Clear the selected coordinator
    setLocationOpen(false);
  };

  const handleAssign = () => {
    if (selectedCoordinator && selectedLocation) {
      onAssign(selectedCoordinator, selectedLocation);
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Assign to Coordinator</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Popover open={locationOpen} onOpenChange={setLocationOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start">
                {selectedLocation || "Select a location"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0" side="bottom" align="start">
              <Command>
                <CommandInput placeholder="Search location..." />
                <CommandList>
                  <CommandEmpty>No location found.</CommandEmpty>
                  <CommandGroup>
                    {locations.map((location) => (
                      <CommandItem
                        key={location}
                        onSelect={handleLocationSelect}
                      >
                        {location}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>

          <Popover open={coordinatorOpen} onOpenChange={setCoordinatorOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start" disabled={!selectedLocation}>
                {selectedCoordinator || "Select a coordinator"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0" side="bottom" align="start">
              <Command>
                <CommandInput placeholder="Search coordinator..." />
                <CommandList>
                  <CommandEmpty>No coordinator found.</CommandEmpty>
                  <CommandGroup>
                    {selectedLocation && coordinators[selectedLocation].map((coordinator) => (
                      <CommandItem
                        key={coordinator}
                        onSelect={(value) => {
                          setSelectedCoordinator(value);
                          setCoordinatorOpen(false);
                        }}
                      >
                        {coordinator}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
        <DialogFooter>
          <Button onClick={handleAssign} disabled={!selectedCoordinator || !selectedLocation}>
            Assign
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AssignCoordinatorDialog;