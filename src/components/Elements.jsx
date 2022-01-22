import { CONTAINER_STYLE } from "./styles";

export const Container = ({ children }) => (
  <div style={CONTAINER_STYLE}>
    {children}
  </div>
);
