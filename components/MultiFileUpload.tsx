import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { X } from 'lucide-react';

interface MultiFileUploadProps {
  onFilesChange: (files: File[]) => void;
}

export default function MultiFileUpload({ onFilesChange }: MultiFileUploadProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(event.target.files || []);
    if (files.length + newFiles.length <= 5) {
      const updatedFiles = [...files, ...newFiles];
      setFiles(updatedFiles);
      onFilesChange(updatedFiles);
    } else {
      alert('You can only upload up to 5 files.');
    }
  };

  const handleRemoveFile = (index: number) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
    onFilesChange(updatedFiles);
  };

  return (
    <Card className="m-4  p-4">
      <CardContent>
        <Label className="block mb-2">Upload Files (PDF, DOC, DOCX)</Label>
        <input
          type="file"
          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
          multiple
          onChange={handleFileChange}
          disabled={uploading}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
        <ul className="mt-4 space-y-2">
          {files.map((file, index) => (
            <li key={index} className="flex items-center justify-between p-2 border rounded">
              <span>{file.name}</span>
              <Button variant="ghost" size="icon" onClick={() => handleRemoveFile(index)}>
                <X className="w-4 h-4" />
              </Button>
            </li>
          ))}
        </ul>
        {uploading && (
          <div className="mt-4">
            <Progress value={50} className="w-full" />
            <p className="text-sm text-gray-500 mt-2">Uploading...</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}