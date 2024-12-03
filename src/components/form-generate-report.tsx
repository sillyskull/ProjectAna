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
import "../components/styles/generate _report.css"
interface FormToGenerateReportProps {
  caseNumber: number;
  platforms: string[];
}

export function FormToGenerateReport({ caseNumber, platforms }: FormToGenerateReportProps) {
  const [aiAnalysis, setAiAnalysis] = useState<"yes" | "no" | null>(null);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);

  const togglePlatform = (platform: string) => {
    setSelectedPlatforms((prev) =>
      prev.includes(platform)
        ? prev.filter((selected) => selected !== platform)
        : [...prev, platform]
    );
  };

  const handleAiAnalysisChange = (value: "yes" | "no") => {
    setAiAnalysis(value);
    if (value === "yes") {
      // Clear the selected platforms when AI analysis is set to "yes"
      setSelectedPlatforms([]);
    }
  };

  const isFormValid = aiAnalysis === "yes" || (aiAnalysis === "no" && selectedPlatforms.length > 0);

  return (
    <Card className="w-full max-w-[400px] p-6 shadow-md border border-gray-300 rounded-md bg-white">
      <CardHeader>
        <CardTitle className="text-lg font-bold text-gray-800">
          Case Number - {caseNumber}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid w-full items-start gap-4">
          {/* AI Analysis Option */}
          <div>
            <Label className="text-gray-700 font-semibold">Should we perform AI analysis on data?</Label>
            <div className="flex gap-4 mt-2">
              <label className="flex items-center gap-2 text-gray-800">
                <input
                  type="radio"
                  name="aiAnalysis"
                  value="yes"
                  onChange={() => handleAiAnalysisChange("yes")}
                  checked={aiAnalysis === "yes"}
                  className="radio-input"
                />
                Yes
              </label>
              <label className="flex items-center gap-2 text-gray-800">
                <input
                  type="radio"
                  name="aiAnalysis"
                  value="no"
                  onChange={() => handleAiAnalysisChange("no")}
                  checked={aiAnalysis === "no"}
                  className="radio-input"
                />
                No
              </label>
            </div>
          </div>

          {/* Platform Selection (Visible only if "No" is selected) */}
          {aiAnalysis === "no" && (
            <div>
              <Label className="text-gray-700 font-semibold">Select all sources to include in report</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {platforms.map((platform) => (
                  <Button
                    key={platform}
                    variant="outline"
                    onClick={(e) => {
                      e.preventDefault();
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
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button
          variant="default"
          className="px-6 py-2"
          disabled={!isFormValid}
        >
          Generate
        </Button>
      </CardFooter>
    </Card>
  );
}
