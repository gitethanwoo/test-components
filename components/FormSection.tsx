import React, { useState } from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DatePicker } from "@/components/ui/datepicker";
import { Checkbox } from "@/components/ui/checkbox";
import { KeyboardEvent } from 'react';
import { Separator } from "@/components/ui/separator";

export type Field = {
  name: string;
  label: string;
  type: 'select' | 'text' | 'email' | 'tel' | 'date' | 'radio' | 'checkbox' | 'textarea' | 'custom';
  placeholder?: string;
  options?: { value: string; label: string; }[] | string[];
  component?: React.ComponentType<any>;
  subtext?: string;
}

interface FormSectionProps {
  title: string;
  fields: Field[];
  onPrevious?: () => void;
  onContinue?: () => void;
  continueButtonText?: string;
  children?: React.ReactNode;
}

export function FormSection({ title, fields, onPrevious, onContinue, continueButtonText = 'Continue', children }: FormSectionProps) {
  const [formData, setFormData] = useState<Record<string, string | Date | string[] | undefined>>({});

  const handleInputChange = (name: string, value: string | Date | undefined) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (name: string, value: string, checked: boolean) => {
    setFormData(prev => {
      const currentValues = prev[name] as string[] || [];
      if (checked) {
        return { ...prev, [name]: [...currentValues, value] };
      } else {
        return { ...prev, [name]: currentValues.filter(v => v !== value) };
      }
    });
  };

  const handleCheckboxKeyDown = (event: KeyboardEvent<HTMLButtonElement>, name: string, value: string) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      const isChecked = (formData[name] as string[] || []).includes(value);
      handleCheckboxChange(name, value, !isChecked);
    }
  };

  return (
    <>
      <h2 className="text-md font-semibold mb-4 text-left">{title}</h2>
      <Card className="pt-6">
        <CardContent className="space-y-4">
          {fields.map((field, index) => (
            <div key={index} className={field.name.includes('name') ? 'grid grid-cols-2 gap-4' : 'space-y-2'}>
              {field.name.includes('name') ? (
                <>
                  <div className="space-y-2">
                    <Label htmlFor={`${field.name}-first`}>{field.label}</Label>
                    <Input id={`${field.name}-first`} placeholder="First" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`${field.name}-last`}>&nbsp;</Label>
                    <Input id={`${field.name}-last`} placeholder="Last" />
                  </div>
                </>
              ) : field.type === 'select' ? (
                <div className="space-y-2">
                  <Label htmlFor={field.name}>{field.label}</Label>
                  <Select>
                    <SelectTrigger id={field.name}>
                      <SelectValue placeholder={field.placeholder} />
                    </SelectTrigger>
                    <SelectContent>
                      {field.options?.map((option) => (
                        <SelectItem key={typeof option === 'string' ? option : option.value} 
                                    value={typeof option === 'string' ? option : option.value}>
                          {typeof option === 'string' ? option : option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              ) : field.type === 'radio' ? (
                <div className="space-y-2">
                  <Label>{field.label}</Label>
                  {field.options?.map((option) => (
                    <div key={typeof option === 'string' ? option : option.value} 
                          className="flex items-center space-x-2">
                      <input type="radio" id={`${field.name}-${typeof option === 'string' ? option : option.value}`} 
                             name={field.name} value={typeof option === 'string' ? option : option.value} />
                      <Label htmlFor={`${field.name}-${typeof option === 'string' ? option : option.value}`}>
                        {typeof option === 'string' ? option : option.label}
                      </Label>
                    </div>
                  ))}
                </div>
              ) : field.type === 'checkbox' ? (
                <div className="space-y-4">
                  <Label>{field.label}</Label>
                  {field.options?.map((option) => {
                    const optionValue = typeof option === 'string' ? option : option.value;
                    const optionLabel = typeof option === 'string' ? option : option.label;
                    const isChecked = (formData[field.name] as string[] || []).includes(optionValue);
                    return (
                      <div key={optionValue} className="flex items-center space-x-2">
                        <Checkbox
                          id={`${field.name}-${optionValue}`}
                          checked={isChecked}
                          onCheckedChange={(checked) => handleCheckboxChange(field.name, optionValue, checked as boolean)}
                          onKeyDown={(e) => handleCheckboxKeyDown(e, field.name, optionValue)}
                        />
                        <Label
                          htmlFor={`${field.name}-${optionValue}`}
                          className="text-sm font-medium leading-tight peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {optionLabel}
                        </Label>
                      </div>
                    );
                  })}
                </div>
              ) : field.type === 'textarea' ? (
                <div className="space-y-2">
                  <Label htmlFor={field.name}>{field.label}</Label>
                  <textarea id={field.name} placeholder={field.placeholder} className="w-full p-2 border rounded"></textarea>
                </div>
              ) : field.type === 'date' ? (
                <div className="space-y-2">
                  <Label htmlFor={field.name}>{field.label}</Label>
                  <DatePicker
                    date={formData[field.name] as Date | undefined}
                    setDate={(date: Date | undefined) => handleInputChange(field.name, date)}
                    className="w-full"
                  />
                </div>
              ) : field.type === 'custom' && field.component ? (
                <div className="space-y-2">
                  <Label htmlFor={field.name}>{field.label}</Label>
                  <field.component
                    options={field.options}
                    value={formData[field.name] || ''}
                    onChange={(value: string) => handleInputChange(field.name, value)}
                    name={field.name}
                  />
                  {field.subtext && <p className="text-sm text-gray-500">{field.subtext}</p>}
                </div>
              ) : (
                <div className="space-y-2">
                  <Label htmlFor={field.name}>{field.label}</Label>
                  <Input id={field.name} type={field.type} placeholder={field.placeholder} />
                </div>
              )}
            </div>
          ))}
        </CardContent>
        {children}
        <Separator className="my-6" />
        <CardFooter className="pt-0 pb-4">
          <div className="w-full flex justify-end space-x-3">
            {onPrevious && (
              <Button variant="outline" onClick={onPrevious}>
                Previous
              </Button>
            )}
            {onContinue && (
              <Button onClick={onContinue}>{continueButtonText}</Button>
            )}
          </div>
        </CardFooter>
      </Card>
    </>
  );
}