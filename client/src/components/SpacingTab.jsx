import { Label } from "@radix-ui/react-label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import VariableTable from "./VariableTable";
import { generateSpacingVariables } from "@/lib/utils";

const SpacingTab = ({ enums, selectedSpacingSize, setSelectedSpacingSize }) => {
  const sizeVariables = generateSpacingVariables(selectedSpacingSize);

  const handleBaseSizeChange = (value) => {
    setSelectedSpacingSize(value);
  };

  return (
    <>
      <Card className="col-span-1">
        <CardHeader>
          <CardTitle>Spacing</CardTitle>
        </CardHeader>
        <CardContent className="space-y-1 h-[400px]">
          <Label htmlFor="name">Select base size</Label>
          <Select
            onValueChange={(value) => {
              handleBaseSizeChange(value);
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={selectedSpacingSize} />
            </SelectTrigger>
            <SelectContent>
              {enums &&
                enums?.spacingBaseSize.map((size, idx) => {
                  return (
                    <SelectItem value={size} key={idx}>
                      {size}
                    </SelectItem>
                  );
                })}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>
      <Card className="col-span-3">
        <VariableTable sizeVariables={sizeVariables} />
      </Card>
    </>
  );
};

export default SpacingTab;
