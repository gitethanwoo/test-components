"use client"

import React, { useState, useMemo } from 'react';
import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis, Cell } from "recharts"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, X } from 'lucide-react';

import {
  ChartConfig,
  ChartContainer,
} from "@/components/ui/chart"

type ExtendedChartConfig = ChartConfig & {
  totalWorkload?: {
    label?: string;
    color?: string;
    hoverColor?: string;
  };
  label?: {
    color?: string;
  };
};

interface Coordinator {
  name: string;
  workload: {
    prospectiveMoms: number;
    waitingForPreAssessment: number;
    inGroupClass: number;
    waitingToBePaired: number;
    inProgram: number;
    waitingForPostAssessment: number;
  };
}

interface AssignCoordinatorDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onAssign: (coordinatorName: string) => void;
  coordinators?: Coordinator[];
  currentCoordinator: string | null;
}

const workloadCategories = [
  { key: "prospectiveMoms", label: "Prospective Moms" },
  { key: "waitingForPreAssessment", label: "Waiting for Pre-Assessment" },
  { key: "waitingToBePaired", label: "Waiting to be Paired" },
  { key: "inGroupClass", label: "In Group Class" },
  { key: "inProgram", label: "In Program" },
  { key: "waitingForPostAssessment", label: "Waiting for Post-Assessment" },
] as const;

const chartConfig = {
  totalWorkload: {
    label: "Total Workload",
    color: "hsl(30, 100%, 90%)", // Light orange
    hoverColor: "hsl(30, 100%, 80%)", // Lighter orange
  },
  label: {
    color: "hsl(0, 0%, 7%)", // Dark 121212
  },
} as const;

const AssignCoordinatorDialog: React.FC<AssignCoordinatorDialogProps> = ({ isOpen, onOpenChange, onAssign, coordinators = [], currentCoordinator }) => {
  const [selectedCoordinator, setSelectedCoordinator] = useState<string>(currentCoordinator || "");
  const [expandedCoordinator, setExpandedCoordinator] = useState<string | null>(null);
  const [hoveredBar, setHoveredBar] = useState<string | null>(null);

  const handleBarClick = (data: any) => {
    setExpandedCoordinator(expandedCoordinator === data.name ? null : data.name);
  };

  const handleAssign = () => {
    if (selectedCoordinator) {
      onAssign(selectedCoordinator);
      onOpenChange(false);
    }
  };

  const chartData = useMemo(() => coordinators.map(coordinator => ({
    name: coordinator.name,
    totalWorkload: Object.values(coordinator.workload).reduce((a, b) => a + b, 0),
    workload: coordinator.workload
  })), [coordinators]);


  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>{currentCoordinator ? "Edit Assigned Coordinator" : "Assign to Coordinator"}</DialogTitle>
        </DialogHeader>
        <div className="flex-grow overflow-y-auto">
          <h3 className="text-sm font-medium text-center sm:text-left">Coordinator Workload</h3>
          <ChartContainer config={chartConfig} className="w-full min-h-[320px] overflow-visible">
            <BarChart
              data={chartData}
              layout="vertical"
              margin={{ top: 10, right: 0, bottom: 10, left: 0 }}
              barSize={40}
              barGap={4}
              width={400}
            >
              <CartesianGrid horizontal={false} />
              <YAxis
                dataKey="name"
                type="category"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                hide
              />
              <XAxis type="number" hide />
              <Bar
                dataKey="totalWorkload"
                radius={[4, 4, 4, 4]}
                onClick={handleBarClick}
                onMouseEnter={(data) => setHoveredBar(data.name)}
                onMouseLeave={() => setHoveredBar(null)}
                isAnimationActive={false}
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    cursor="pointer"
                    fill={hoveredBar === entry.name ? chartConfig.totalWorkload.hoverColor : chartConfig.totalWorkload.color}
                  />
                ))}
                <LabelList
                  dataKey="name"
                  position="insideLeft"
                  offset={8}
                  fill={chartConfig.label.color}
                  fontSize={12}
                />
                <LabelList
                  dataKey="totalWorkload"
                  position="right"
                  offset={8}
                  className="fill-foreground"
                  fontSize={12}
                />
              </Bar>
            </BarChart>
          </ChartContainer>
          <AnimatePresence>
            {expandedCoordinator && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <CoordinatorDetails
                  coordinator={coordinators.find(c => c.name === expandedCoordinator)!}
                  onClose={() => setExpandedCoordinator(null)}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <Select onValueChange={setSelectedCoordinator} value={selectedCoordinator}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a coordinator" />
          </SelectTrigger>
          <SelectContent>
            {coordinators && coordinators.length > 0 ? (
              coordinators.map((coordinator) => (
                <SelectItem key={coordinator.name} value={coordinator.name}>
                  {coordinator.name}
                </SelectItem>
              ))
            ) : (
              <SelectItem value="no_coordinators" disabled>No coordinators available</SelectItem>
            )}
          </SelectContent>
        </Select>
        <DialogFooter>
          <Button onClick={handleAssign} disabled={!selectedCoordinator || selectedCoordinator === currentCoordinator}>
            {currentCoordinator ? "Update Assignment" : "Assign"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const CoordinatorDetails: React.FC<{ coordinator: Coordinator; onClose: () => void }> = ({ coordinator, onClose }) => {
  return (
    <div className="mt-4 p-4 bg-secondary rounded-md overflow-hidden">
      <div className="flex justify-between items-center mb-2">
        <h4 className="font-bold text-lg">{coordinator.name}</h4>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="h-5 w-5" />
        </Button>
      </div>
      {workloadCategories.map(({ key, label }) => (
        <p key={key} className="text-sm flex justify-between py-1">
          <span>{label}:</span>
          <span className="font-medium">{coordinator.workload[key as keyof typeof coordinator.workload]}</span>
        </p>
      ))}
      <p className="font-bold mt-2 flex justify-between">
        <span>Total:</span>
        <span>{Object.values(coordinator.workload).reduce((a, b) => a + b, 0)}</span>
      </p>
    </div>
  );
};

export default AssignCoordinatorDialog;