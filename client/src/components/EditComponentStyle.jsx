import { Button } from "./ui/button";
import { Input } from "./ui/input";

const EditComponentStyle = ({
  componentStyle,
  componentsStyles,
  setComponentsStyles,
}) => {
  return (
    <>
      {componentStyle && (
        <div className="grid grid-cols-3 gap-2">
          <div className="space-y-1">
            <Input
              type="text"
              placeholder="Bg Color"
              defaultValue={componentStyle.backgroundColor}
              onChange={(e) => {
                const updatedStyles = componentsStyles.map((style) => {
                  if (style.label === componentStyle.label) {
                    return { ...style, backgroundColor: e.target.value };
                  }
                  return style;
                });
                setComponentsStyles(updatedStyles);
              }}
            />
          </div>
          <div className="space-y-1">
            <Input
              type="text"
              placeholder="Text Color"
              defaultValue={componentStyle.color}
              onChange={(e) => {
                const updatedStyles = componentsStyles.map((style) => {
                  if (style.label === componentStyle.label) {
                    return { ...style, color: e.target.value };
                  }
                  return style;
                });
                setComponentsStyles(updatedStyles);
              }}
            />
          </div>
          <div className="space-y-1">
            <Input
              type="text"
              placeholder="Border Color"
              onChange={(e) => {
                const updatedStyles = componentsStyles.map((style) => {
                  if (style.label === componentStyle.label) {
                    return {
                      ...style,
                      borderColor: e.target.value,
                      borderWidth: "1px",
                    };
                  }
                  return style;
                });
                setComponentsStyles(updatedStyles);
              }}
            />
          </div>
          <div className="space-y-1">
            <Input
              type="text"
              placeholder="Border Radius"
              defaultValue={componentStyle.borderRadius}
              onChange={(e) => {
                const updatedStyles = componentsStyles.map((style) => {
                  if (style.label === componentStyle.label) {
                    return { ...style, borderRadius: e.target.value };
                  }
                  return style;
                });
                setComponentsStyles(updatedStyles);
              }}
            />
          </div>
          <div className="space-y-1">
            <Input
              type="text"
              placeholder="Padding-X"
              defaultValue={componentStyle.padding}
              onChange={(e) => {
                const updatedStyles = componentsStyles.map((style) => {
                  if (style.label === componentStyle.label) {
                    return {
                      ...style,
                      paddingLeft: e.target.value,
                      paddingRight: e.target.value,
                    };
                  }
                  return style;
                });
                setComponentsStyles(updatedStyles);
              }}
            />
          </div>
          <div className="space-y-1">
            <Input
              type="text"
              placeholder="Padding-Y"
              defaultValue={componentStyle.padding}
              onChange={(e) => {
                const updatedStyles = componentsStyles.map((style) => {
                  if (style.label === componentStyle.label) {
                    return {
                      ...style,
                      paddingTop: e.target.value,
                      paddingBottom: e.target.value,
                    };
                  }
                  return style;
                });
                setComponentsStyles(updatedStyles);
              }}
            />
          </div>
          <Button>Save</Button>
        </div>
      )}
    </>
  );
};

export default EditComponentStyle;
