import { CardContent } from "./ui/card";
import { Input } from "./ui/input";

const VariableTable = ({ sizeVariables }) => {
  return (
    <CardContent className="space-y-1">
      <div className="grid grid-cols-2 mt-10 gap-4 font-medium">
        <p>Variable Name</p>
        <p>Size (px)</p>
      </div>
      <hr />
      {sizeVariables.map(({ name, size }, idx) => {
        return (
          <div key={idx} className="grid grid-cols-2 gap-4 mt-4">
            <Input type="text" value={name} className="w-[50%]" />
            <Input type="text" value={size} className="w-[50%]" />
          </div>
        );
      })}
      <hr />
    </CardContent>
  );
};

export default VariableTable;
