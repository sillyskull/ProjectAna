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

// Props type for the CardWithForm component
interface SocialMediaCardWithFormProps {
  platform: string; // Platform name (e.g., "instagram", "twitter", etc.)
  Icon: React.FC<React.SVGProps<SVGSVGElement>>; // Icon component type
  title: string; // Title of the card
}

export function SocialMediaCardWithForm({ platform, Icon, title }: SocialMediaCardWithFormProps) {
  return (
    <Card className="w-[350px]">
      <CardHeader className="flex flex-col items-center space-y-2">
        <CardTitle>{title}</CardTitle>
        <Icon size={50} />
      </CardHeader>
      <CardContent>
        <form className="flex flex-col items-center">
          <div className="grid w-full gap-4">
            {/* Name Input Field */}
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Enter name of Suspect/Accused" />
            </div>
            {/* Username Input Field */}
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor={`${platform}-username`}>Username/Email</Label>
              <Input
                id={`${platform}-username`}
                placeholder="Enter Username/E-mail"
              />
            </div>
            {/* Password Input Field */}
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor={`${platform}-password`}>Password</Label>
              <Input
                id={`${platform}-password`}
                type="password"
                placeholder="Password"
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button variant="outline">Extract</Button>
      </CardFooter>
    </Card>
  );
}
