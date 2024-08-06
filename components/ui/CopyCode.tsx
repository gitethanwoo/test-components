import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, Copy } from 'lucide-react';

const CopyCode = ({ code }: { code: string }) => {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardContent className="p-4">
        <div className="relative">
          <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto max-h-96">
            <code className="text-sm font-mono text-gray-800">{code}</code>
          </pre>
          <Button
            className="absolute top-2 right-2 bg-white hover:bg-gray-100"
            onClick={copyToClipboard}
          >
            {isCopied ? (
              <Check className="h-4 w-4 text-green-500" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

// Example usage
const ExampleUsage = () => {
  const sampleCode = `
import React from 'react';

const HelloWorld = () => {
  return <h1>Hello, World!</h1>;
};

export default HelloWorld;
  `.trim();

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Sample Component Code</h2>
      <CopyCode code={sampleCode} />
    </div>
  );
};

export { CopyCode, ExampleUsage };