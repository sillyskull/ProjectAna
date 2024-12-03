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

export function LoginCardWithForm() {
  return (
    <Card className="w-full max-w-lg p-6 shadow-lg border border-gray-200 rounded-lg">
      <CardHeader className="flex flex-col items-center space-y-2">
        <CardTitle className="text-2xl font-bold text-gray-800">Login</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="flex flex-col items-center">
          <div className="grid w-full gap-6">
            <div className="flex flex-col space-y-2">
              <Label htmlFor="batchId-field" className="font-medium">Batch Id</Label>
              <Input
                id="batchId-field"
                placeholder="Enter Your Batch Id"
                className="w-full border-gray-300 focus:ring-primary focus:border-primary"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <Label htmlFor="username-field" className="font-medium">Username/Email</Label>
              <Input
                id="username-field"
                placeholder="Enter Username"
                className="w-full border-gray-300 focus:ring-primary focus:border-primary"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <Label htmlFor="password-field" className="font-medium">Password</Label>
              <Input
                id="password-field"
                type="password"
                placeholder="Enter Password"
                className="w-full border-gray-300 focus:ring-primary focus:border-primary"
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center mt-4">
        <Button className="w-full py-2 text-base font-normal">Login</Button>
      </CardFooter>
    </Card>
  );
}
