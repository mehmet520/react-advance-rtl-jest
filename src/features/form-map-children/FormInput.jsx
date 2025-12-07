import React from "react";

function FormInput({
  label,
  name,
  value,
  onChange,
  placeholder,
  onBlur,
  error,
  touched,
}) {
  return (
    <div className="form-field">
      {console.count(`Render <FormInput name='${name}'>`)}
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        onBlur={onBlur}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${name}-error` : undefined}
      />
      {touched && error ? (
        <div id={`${name}-error`} style={{ color: "crimson", margin: 3 }} role="alert">
          {error}
        </div>
      ) : null}
    </div>
  );
}

export default React.memo(FormInput);
