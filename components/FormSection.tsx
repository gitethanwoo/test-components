import React from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export interface Field {  // Exporting Field type
  name: string;
  label: string;
  type: 'text' | 'email' | 'tel' | 'date' | 'select' | 'radio' | 'checkbox' | 'textarea';
  placeholder?: string;
  options?: { value: string; label: string }[];
}

interface FormSectionProps {
  title: string;
  fields: Field[];
  onPrevious?: () => void;
  onContinue?: () => void;
}

export function FormSection({ title, fields, onPrevious, onContinue }: FormSectionProps) {
  return (
    <>
      <h2 className="text-md font-semibold mb-4 text-left">{title}</h2>
      <Card className="p-8">
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
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              ) : field.type === 'radio' ? (
                <div className="space-y-2">
                  <Label>{field.label}</Label>
                  {field.options?.map((option) => (
                    <div key={option.value} className="flex items-center space-x-2">
                      <input type="radio" id={`${field.name}-${option.value}`} name={field.name} value={option.value} />
                      <Label htmlFor={`${field.name}-${option.value}`}>{option.label}</Label>
                    </div>
                  ))}
                </div>
              ) : field.type === 'checkbox' ? (
                <div className="space-y-4"> {/* Increased vertical space */}
                  <Label>{field.label}</Label>
                  {field.options?.map((option) => (
                    <div key={option.value} className="flex items-center space-x-2">
                      <input type="checkbox" id={`${field.name}-${option.value}`} name={field.name} value={option.value} />
                      <Label htmlFor={`${field.name}-${option.value}`}>{option.label}</Label>
                    </div>
                  ))}
                </div>
              ) : field.type === 'textarea' ? (
                <div className="space-y-2">
                  <Label htmlFor={field.name}>{field.label}</Label>
                  <textarea id={field.name} placeholder={field.placeholder} className="w-full p-2 border rounded"></textarea>
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
        <CardFooter className="flex justify-between">
          {onPrevious && (
            <Button variant="outline" onClick={onPrevious}>
              Previous
            </Button>
          )}
          {onContinue && (
            <Button onClick={onContinue}>Continue</Button>
          )}
        </CardFooter>
      </Card>
    </>
  );
}