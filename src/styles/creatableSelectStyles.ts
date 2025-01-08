import { StylesConfig } from "react-select";

export const selectStyles:  StylesConfig<any, false> = {
  placeholder: (provided) => ({
    ...provided,
    fontStyle: "italic",
    fontFamily: "system-ui",
    color: "#6c757d",
  }),
  control: (provided, state) => ({
    ...provided,
    border: state.isFocused ? "1px solid #007bff" : "1px solid #dee2e6",
    borderRadius: "0.25rem",
    boxShadow: state.isFocused
      ? "0 0 0 0.2rem rgba(0, 123, 255, 0.25)"
      : "none",
    padding: "6px 6px",
  }),
};
