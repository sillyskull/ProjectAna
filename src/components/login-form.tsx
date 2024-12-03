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
    <Card className="w-fit p-6">
      <CardHeader className="flex flex-col items-center space-y-2">
        <CardTitle>Login</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="flex flex-col items-center">
          <div className="grid w-full gap-4">
          <div className="flex flex-col space-y-1.5">
              <Label htmlFor="batchId-field">Batch Id</Label>
              <Input
                id={`batchId-field`}
                placeholder="Enter Your Bacth Id"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="username-field">Username/Email</Label>
              <Input
                id="username-field"
                placeholder="Enter Username"
              />
            </div>
            {/* Password Input Field */}
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password-field">Password</Label>
              <Input
                id="password-field"
                type="password"
                placeholder="Password"
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button>Login</Button>
      </CardFooter>
    </Card>
  );
}
