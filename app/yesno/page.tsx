"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";

const CustomRadioGroup = ({ options, value, onChange, name }: {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  name: string;
}) => (
  <RadioGroup
    value={value}
    onValueChange={onChange}
    className="flex space-x-2"
  >
    {options.map((option) => (
      <Button
        key={`${name}-${option.toLowerCase()}`}
        onClick={() => onChange(option.toLowerCase())}
        type="button"
        variant="outline"
        className={cn(
          "px-3 py-2 text-sm font-medium rounded-md border-2",
          "hover:bg-slate-100 hover:text-accent-foreground",
          "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          value === option.toLowerCase()
            ? "border-primary bg-primary text-primary-foreground"
            : "border-muted bg-popover"
        )}
      >
        {option}
      </Button>
    ))}
  </RadioGroup>
);

const SubstanceAbuseHistoryForm = () => {
  const [historyOfAbuse, setHistoryOfAbuse] = useState("");
  const [lastUseDate, setLastUseDate] = useState("");
  const [attendingGroups, setAttendingGroups] = useState("");
  const [receivingTreatment, setReceivingTreatment] = useState("");

  const handleSave = () => {
    console.log("Form data saved:", {
      historyOfAbuse,
      lastUseDate,
      attendingGroups,
      receivingTreatment
    });
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardContent className="pt-6">
        <h2 className="text-xl font-semibold mb-4">Substance Abuse History</h2>
        <div className="space-y-6">
          <div>
            <Label className="block mb-2">History of Substance Abuse</Label>
            <CustomRadioGroup
              options={['Yes', 'No', 'Unknown']}
              value={historyOfAbuse}
              onChange={setHistoryOfAbuse}
              name="history-of-abuse"
            />
          </div>

          {historyOfAbuse.toLowerCase() === 'yes' && (
            <>
              <div>
                <Label htmlFor="last-use-date" className="block mb-2">
                  When was the last time Mom used?
                </Label>
                <Input
                  id="last-use-date"
                  placeholder="e.g. yesterday, last month, last year"
                  value={lastUseDate}
                  onChange={(e) => setLastUseDate(e.target.value)}
                  className="w-full"
                />
              </div>

              <div>
                <Label className="block mb-2">
                  Is Mom attending NA or AA Recovery Groups?
                </Label>
                <CustomRadioGroup
                  options={['Yes', 'No', 'Unknown']}
                  value={attendingGroups}
                  onChange={setAttendingGroups}
                  name="attending-groups"
                />
              </div>

              <div>
                <Label className="block mb-2">
                  Is Client receiving in/outpatient treatment?
                </Label>
                <CustomRadioGroup
                  options={['Yes', 'No', 'Unknown']}
                  value={receivingTreatment}
                  onChange={setReceivingTreatment}
                  name="receiving-treatment"
                />
              </div>
            </>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-end space-x-2 bg-gray-50">
        <Button variant="outline">Cancel</Button>
        <Button onClick={handleSave} className="bg-[#153839] text-white hover:bg-[#153839]/90">
          Save changes
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SubstanceAbuseHistoryForm;