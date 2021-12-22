import React from "react";

export const ShallowMock = (Component:any, props:any) => {
  return React.cloneElement(Component, props);
};

export default ShallowMock;
