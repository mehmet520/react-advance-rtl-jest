import React from "react";

function FormSelect({
  label,
  name,
  value,
  onChange,
  options,
  onBlur,
  error,
  touched,
}) {
  return (
    <div className="form-field">
      {console.count(`Render <FormSelect name='${name}'>`)}
      <label htmlFor={name}>{label}</label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${name}-error` : undefined}
      >
        <option value="">Seciniz</option>
        {options.map((opt) => (
          <option key={opt.key ?? opt.label} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {touched && error ? (
        <div id={`${name}-error`} style={{ color: "crimson", marginTop: 3 }} role="alert">
          {error}
        </div>
      ) : null}
    </div>
  );
}

export default React.memo(FormSelect, (prev, next) => {
  const same =
    prev.name === next.name &&
    prev.label === next.label &&
    prev.value === next.value &&
    // prev.onChange === next.onChange &&
    prev.options === next.options;

  if (!same) {
    console.log("FormSelect props changed: ", {
      name: prev.name === next.name,
      label: prev.label === next.label,
      value: prev.value === next.value,
      // onChange: prev.onChange === next.onChange,
      options: prev.options === next.options,
    });
  }
  return same;
});
