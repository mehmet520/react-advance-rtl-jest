import * as React from "react";

/** ---------------------------
 *  Yardımcı: tek bir alanı doğrula
 *  rules: {
 *    required?: boolean | string,           // true veya hata mesajı
 *    minLength?: { value: number, message?: string },
 *    maxLength?: { value: number, message?: string },
 *    pattern?: { value: RegExp, message?: string },
 *    custom?: (value, allValues) => string | null | undefined
 *  }
 *  --------------------------*/
function validateValue(value, rules = {}, allValues = {}) {
  // Boşluk normalize
  const v = typeof value === "string" ? value : value ?? "";
  // required
  if (rules.required) {
    const empty =
      typeof v === "string" ? v.trim().length === 0 : v === false || v == null;
    if (empty) {
      return typeof rules.required === "string"
        ? rules.required
        : "Bu alan zorunludur.";
    }
  }
  // minLength
  if (rules.minLength && typeof v === "string") {
    if (v.length < rules.minLength.value) {
      return rules.minLength.message || `En az ${rules.minLength.value} karakter girin.`;
    }
  }
  // maxLength
  if (rules.maxLength && typeof v === "string") {
    if (v.length > rules.maxLength.value) {
      return rules.maxLength.message || `En çok ${rules.maxLength.value} karakter girin.`;
    }
  }
  // pattern
  if (rules.pattern && typeof v === "string") {
    if (!rules.pattern.value.test(v)) {
      return rules.pattern.message || "Geçersiz biçim.";
    }
  }
  // custom
  if (typeof rules.custom === "function") {
    const msg = rules.custom(v, allValues);
    if (msg) return msg;
  }
  return null;
}

/** ---------------------------
 *  Form (containment + cloneElement)
 *  - Tüm field state'lerini ve hataları tutar
 *  - children'lara value/checked/onChange/onBlur, error, touched enjekte eder
 *  --------------------------*/
function Form({ children, onSubmit, initialValues = {} }) {
  const [form, setForm] = React.useState(initialValues);
  const [errors, setErrors] = React.useState({});
  const [touched, setTouched] = React.useState({});

  function setFieldValue(name, value) {
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleChange(e) {
    const { name, type } = e.target;
    const value = type === "checkbox" ? e.target.checked : e.target.value;
    setFieldValue(name, value);

    // Anında doğrulama (field-level)
    const fieldRules = fieldRulesMapRef.current[name];
    if (fieldRules) {
      const msg = validateValue(value, fieldRules, { ...form, [name]: value });
      setErrors((prev) => ({ ...prev, [name]: msg }));
    }
  }

  function handleBlur(e) {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));

    // Blur'da doğrula (isteğe bağlı ama iyi bir deneyim)
    const fieldRules = fieldRulesMapRef.current[name];
    if (fieldRules) {
      const msg = validateValue(form[name], fieldRules, form);
      setErrors((prev) => ({ ...prev, [name]: msg }));
    }
  }

  // Çocuklardan kuralları toplamak için küçük bir "kayıt haritası"
  const fieldRulesMapRef = React.useRef({});
  fieldRulesMapRef.current = {}; // her render'da tazelensin

  // children'ları zenginleştirme
  const enhancedChildren = React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) return child;

    const { name, rules, type: _type } = child.props;
    // name yoksa bu bir form alanı sayılmayabilir, direkt döndür.
    if (!name) return child;

    // Alan kurallarını kaydet
    if (rules) {
      fieldRulesMapRef.current[name] = rules;
    }

    const value = child.props.type === "checkbox"
      ? !!form[name]
      : form[name] ?? "";

    const fieldError = errors[name] || null;
    const isTouched = !!touched[name];

    return React.cloneElement(child, {
      value,
      checked: child.props.type === "checkbox" ? !!form[name] : undefined,
      onChange: handleChange,
      onBlur: handleBlur,
      "aria-invalid": Boolean(fieldError && isTouched) || undefined,
      "aria-describedby": fieldError && isTouched ? `${name}-error` : undefined,
      error: fieldError,
      touched: isTouched,
    });
  });

  // Submit'te toplu doğrulama
  function validateAll() {
    const nextErrors = {};
    const childrenArray = React.Children.toArray(children);
    for (const child of childrenArray) {
      if (!React.isValidElement(child)) continue;
      const { name, rules } = child.props || {};
      if (!name || !rules) continue;
      const msg = validateValue(form[name], rules, form);
      if (msg) nextErrors[name] = msg;
    }
    setErrors(nextErrors);
    // tüm alanları dokunulmuş sayalım ki hatalar gösterilsin
    const allTouched = {};
    for (const key of Object.keys(form)) allTouched[key] = true;
    setTouched((prev) => ({ ...allTouched, ...prev }));
    return nextErrors;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const nextErrors = validateAll();
    const hasError = Object.values(nextErrors).some(Boolean);
    if (!hasError) {
      onSubmit?.(form);
    }
  }

  return <form onSubmit={handleSubmit}>{enhancedChildren}</form>;
}

/** ---------------------------
 *  Specialized Field Components
 *  --------------------------*/
function FieldError({ name, error, touched }) {
  if (!touched || !error) return null;
  return (
    <div id={`${name}-error`} role="alert" style={{ color: "crimson", fontSize: 12, marginTop: 4 }}>
      {error}
    </div>
  );
}

function FormInput({ label, name, error, touched, ...rest }) {
  return (
    <div className="form-field" style={{ marginBottom: 12 }}>
      {label && <label htmlFor={name} style={{ display: "block", marginBottom: 4 }}>{label}</label>}
      <input id={name} name={name} {...rest} />
      <FieldError name={name} error={error} touched={touched} />
    </div>
  );
}

function FormSelect({ label, name, options = [], error, touched, ...rest }) {
  return (
    <div className="form-field" style={{ marginBottom: 12 }}>
      {label && <label htmlFor={name} style={{ display: "block", marginBottom: 4 }}>{label}</label>}
      <select id={name} name={name} {...rest}>
        <option value="">Seçiniz</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      <FieldError name={name} error={error} touched={touched} />
    </div>
  );
}

function FormCheckbox({ label, name, error, touched, ...rest }) {
  return (
    <div className="form-field" style={{ marginBottom: 12 }}>
      <label>
        <input type="checkbox" name={name} {...rest} /> {label}
      </label>
      <FieldError name={name} error={error} touched={touched} />
    </div>
  );
}

/** ---------------------------
 *  Örnek Kullanım
 *  --------------------------*/
export default function FormKontrollu() {
  return (
    <div style={{ maxWidth: 420, margin: "40px auto", fontFamily: "sans-serif" }}>
      <h2>Kayıt Formu</h2>
      <Form
        initialValues={{ ad: "", email: "", sifre: "", cinsiyet: "", sozlesme: false }}
        onSubmit={(data) => alert(JSON.stringify(data, null, 2))}
      >
        <FormInput
          name="ad"
          label="Adınız"
          placeholder="Adınızı girin"
          rules={{
            required: "Ad zorunludur.",
            minLength: { value: 2, message: "Ad en az 2 karakter olmalı." },
          }}
        />

        <FormInput
          name="email"
          label="E-posta"
          placeholder="ornek@site.com"
          rules={{
            required: "E-posta zorunlu.",
            pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Geçerli bir e-posta girin." },
          }}
        />

        <FormInput
          name="sifre"
          label="Şifre"
          type="password"
          placeholder="En az 6 karakter"
          rules={{
            required: true,
            minLength: { value: 6, message: "Şifre en az 6 karakter olmalı." },
            // Özel validator (custom)
            custom: (value) => {
              if (!/[0-9]/.test(value)) return "Şifre en az bir rakam içermeli.";
              return null;
            },
          }}
        />

        <FormSelect
          name="cinsiyet"
          label="Cinsiyet"
          options={[
            { label: "Kadın", value: "kadın" },
            { label: "Erkek", value: "erkek" },
            { label: "Belirtmek istemiyorum", value: "x" },
          ]}
          rules={{ required: "Lütfen bir seçim yapın." }}
        />

        <FormCheckbox
          name="sozlesme"
          label="Şartları kabul ediyorum"
          rules={{ required: "Devam etmek için şartları kabul etmelisiniz." }}
        />

        <button type="submit" style={{ marginTop: 8 }}>Gönder</button>
      </Form>
    </div>
  );
}
