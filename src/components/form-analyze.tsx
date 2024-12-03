import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface FormToAnalyzeProps {
  caseNumber: number;
  platforms: string[];
}

export function FormToAnalyze({ caseNumber, platforms }: FormToAnalyzeProps) {
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);

  const togglePlatform = (platform: string) => {
    setSelectedPlatforms((prev) =>
      prev.includes(platform)
        ? prev.filter((selected) => selected !== platform)
        : [...prev, platform]
    );
  };

  // Check if any platform is selected
  const isFormValid = selectedPlatforms.length > 0;

  return (
    <Card className="w-full max-w-[400px] p-6 shadow-md border border-gray-300 rounded-md bg-white">
      <CardHeader>
        <CardTitle className="text-lg font-bold text-gray-800">
          Case Number - {caseNumber}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-start gap-4">
            {/* Platforms */}
            <div>
              <Label className="text-gray-700">Select sources to analyze:</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {platforms.map((platform) => (
                  <Button
                    key={platform}
                    variant="outline"
                    onClick={(e) => {
                      e.preventDefault(); // Prevent form submission
                      togglePlatform(platform);
                    }}
                    className={`px-4 py-2 text-sm ${
                      selectedPlatforms.includes(platform)
                        ? "bg-green-200 text-green-700 border-green-700"
                        : "bg-white text-gray-700 border-gray-300"
                    }`}
                  >
                    {platform}
                  </Button>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="grid w-full gap-1.5">
              <Label htmlFor="description" className="text-gray-700">
                Description (Optional):
              </Label>
              <Textarea
                id="description"
                placeholder="Enter additional details"
                className="w-full border-gray-300"
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button
          variant="default"
          className="px-6 py-2"
          disabled={!isFormValid}
        >
          Analyze
        </Button>
      </CardFooter>
    </Card>
  );
}
