import React, { memo } from "react";

import "./LayoutAuth";

export const LayoutAuth = memo(({ children }) => {
  children = React.Children.toArray(children);
  let titleComponent = children.find((node) => node.type == LayoutAuth.Title);
  let FormComponent = children.find((node) => node.type == LayoutAuth.Form);
  return (
    <div className="auth">
      <div className="content">
        <div className="auth__top">{titleComponent && titleComponent}</div>
        <div className="auth__main">{FormComponent && FormComponent}</div>
      </div>
    </div>
  );
});

LayoutAuth.Title = ({ children }) => children;
LayoutAuth.Form = ({ children }) => children;
