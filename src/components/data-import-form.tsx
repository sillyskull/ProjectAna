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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function CardWithForm() {
  return (
    <Card className="w-full max-w-[350px] p-4 shadow-md">
  <CardHeader>
    <CardTitle>Import Data from Device:</CardTitle>
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
          />
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="platform">Source:</Label>
          <Select>
            <SelectTrigger id="platform" className="w-full">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent position="popper">
              <SelectItem value="instagram">Instagram</SelectItem>
              <SelectItem value="x">X</SelectItem>
              <SelectItem value="facebook">Facebook</SelectItem>
              <SelectItem value="whatsapp">WhatsApp</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="case_number">Case Number:</Label>
          <Input
            id="case_number"
            placeholder="Enter Case Number"
            className="w-full"
          />
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="files">Attach Files:</Label>
          <Input id="files" type="file" multiple className="w-full" />
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
