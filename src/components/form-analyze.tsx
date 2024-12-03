import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { Textarea } from "@/components/ui/textarea"


export function FormToAnalyze() {
  return (
    <Card className="w-full max-w-[350px] p-4 shadow-md">
  <CardHeader>
    <CardTitle>Case Number 5565</CardTitle>
  </CardHeader>
  <CardContent>
    <form>
      <div className="grid w-full items-center gap-4">
      <div className="grid w-full gap-1.5">
      <Label htmlFor="message">Case Insights</Label>
      <Textarea placeholder="Completely Optional" id="message" />
        </div>
      </div>
    </form>
  </CardContent>
  <CardFooter className="flex justify-center">
    <Button variant="outline" className="w-full">
      Submit
    </Button>
  </CardFooter>
</Card>
  )
}
