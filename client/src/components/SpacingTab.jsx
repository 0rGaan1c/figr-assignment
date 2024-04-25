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
import { useState } from "react";

const SpacingTab = ({
  project,
  setProject,
  enums,
  selectedSpacingSize,
  setSelectedSpacingSize,
}) => {
  const [sizeVariables, setSizeVariables] = useState(
    generateSpacingVariables(selectedSpacingSize)
  );
  console.log(sizeVariables);

  const handleBaseSizeChange = (value) => {
    setSelectedSpacingSize(value);
    setSizeVariables(generateSpacingVariables(value));
  };

  return (
    <>
      <Card className="col-span-1">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Spacing</CardTitle>
        </CardHeader>
        <CardContent className="space-y-1 h-[450px]">
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
