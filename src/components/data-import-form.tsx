import { useState, useRef, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function CardWithDataImportForm() {
  const [name, setName] = useState("");
  const [platform, setPlatform] = useState("");
  const [caseNumber, setCaseNumber] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const files = Array.from(event.target.files);
      const uniqueFiles = files.filter(
        (file) =>
          !selectedFiles.some(
            (existingFile) =>
              existingFile.name === file.name && existingFile.size === file.size
          )
      );

      setSelectedFiles((prev) => [...prev, ...uniqueFiles]);

      // Clear the input field
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  // Form validation logic
  const isFormValid = name && platform && caseNumber && selectedFiles.length > 0;

  return (
    <Card className="w-full max-w-[400px] p-6 shadow-lg border border-gray-200 rounded-lg">
      <CardHeader>
        <CardTitle className="text-lg font-bold text-gray-800">
          Import Data from Device:
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Enter name of Suspect/Accused"
                className="w-full"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="platform">Source:</Label>
              <Select onValueChange={(value) => setPlatform(value)}>
                <SelectTrigger id="platform" className="w-full">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="instagram">Instagram</SelectItem>
                  <SelectItem value="x">X</SelectItem>
                  <SelectItem value="facebook">Facebook</SelectItem>
                  <SelectItem value="whatsapp">WhatsApp</SelectItem>
                  <SelectItem value="external sources">External Sources</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="case_number">Case Number:</Label>
              <Input
                id="case_number"
                placeholder="Enter Case Number"
                className="w-full"
                value={caseNumber}
                onChange={(e) => setCaseNumber(e.target.value)}
              />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="files">Attach Files:</Label>
              <Input
                id="files"
                type="file"
                multiple
                className="w-full"
                onChange={handleFileChange}
                ref={fileInputRef}
              />
              <div className="mt-3 flex flex-wrap gap-2">
                {selectedFiles.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-2 p-2 border rounded-lg bg-gray-100 hover:bg-gray-200 shadow-sm"
                  >
                    <div className="truncate text-sm font-medium text-gray-700 max-w-[150px]">
                      {file.name}
                    </div>
                    <button
                      type="button"
                      className="text-red-500 hover:text-red-700 font-bold"
                      onClick={() => removeFile(index)}
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button className="w-full" disabled={!isFormValid}>
          Submit
        </Button>
      </CardFooter>
    </Card>
  );
}
