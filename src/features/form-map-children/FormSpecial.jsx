import React, { useCallback, useState } from "react";

export default function FormSpecial({ onSubmit, children }) {
  const [data, setData] = useState({}); // Der Wert value wurde gespeichert.
  const [touched, setTouched] = useState({});
  // const [error, setError] = useState(null);

  console.log("data :>> ", data);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.(data);
  };

  const handleChange = useCallback((e) => {
    console.count("handleChange");
    setData((prev) => ({
      ...prev,
      [e.target.name]:
        e.target.type === "checkbox"
          ? !!e.target.checked || false
          : e.target.value || "",
    }));
  }, []);

  const handleBlur = useCallback((e) => {
    setTouched((prev) => ({
      ...prev,
      [e.target.name]: true,
    }));
  }, []);

  const enhancedChildren = React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) return child;

    const isDom = typeof child.type === "string";
    if (isDom && (child.type === "button" || child.props.type === "submit"))
      return child;

    // Einfacher erforderlicher Kontrollmechanismus: Fehler nur nach dem Verlassen des Feldes anzeigen.
    const isRequired = !!child.props.required;
    const isTouched = !!touched[child.props.name];
    const isEmpty =
      typeof data[child.props.name] === "string"
        ? data[child.props.name].trim() === ""
        : data[child.props.name] === false || data[child.props.name] == null;
    const error =
      isRequired && isTouched && isEmpty ? "Hata: Bu alan zorunludur." : null;

    const extraProps = {
      onChange: handleChange,
      onBlur: handleBlur,
      // erişilebilirlik
      // "aria-invalid": error ? true : undefined,
      // "aria-describedby": error ? `${child.props.name}-${error}` : undefined,
      error,
      touched: isTouched,
      // ...(child.type?.name === "FormCheckbox"
      ...(child.props.type === "checkbox"
        ? { checked: !!data[child.props.name] || false }
        : { value: data[child.props.name] || "" }),
    };
    const enhancedChild = React.cloneElement(child, { ...extraProps });
    // console.log("enhancedChild.props :>> ", enhancedChild.props);
    return enhancedChild;
  });
  return <form onSubmit={handleSubmit}>{enhancedChildren}</form>;
}
