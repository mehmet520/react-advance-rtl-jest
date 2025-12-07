import React from "react";

function FormCheckbox({
  label,
  name,
  checked,
  onChange,
  onBlur,
  error,
  touched,
}) {
  return (
    <div className="form-field">
      {console.count(`Render <FormCheckbox name='${name}'>`)}
      <label>
        <input
          type="checkbox"
          name={name}
          checked={checked}
          onChange={onChange}
          onBlur={onBlur}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${name}-error` : undefined}
        />
        {label}
      </label>
      {touched && error ? (
        <div id={`${name}-error`} style={{ color: "crimson", marginTop: 3 }} role="alert">
          {error}
        </div>
      ) : null}
    </div>
  );
}

export default React.memo(FormCheckbox);
