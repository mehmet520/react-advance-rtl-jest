import React, { useState } from "react";

export default function FormSimple({ children }) {
  const [form, setForm] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => {
      const next = { ...prev, [name]: value };
      console.log("form :>> ", next);
      return next;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  // Her child'a value ve onChange props'larını otomatik olarak geçiriyoruz
  const enhancedChildren = React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) return child;

    return React.cloneElement(child, {
      value: form[child.props.name] || "",
      onChange: handleChange,
    });
  });

  return (
    <>
      <form onSubmit={handleSubmit}>
        {enhancedChildren}
        <button type="submit">Gonder</button>
      </form>
    </>
  );
}
