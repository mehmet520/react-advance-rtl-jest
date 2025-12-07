import FormCheckbox from "./FormCheckbox";
import FormInput from "./FormInput";
import FormSelect from "./FormSelect";
import FormSimple from "./FormSimple";
import FormSpecial from "./FormSpecial";

const GENDER_OPTIONS = [
  { label: "Kadın", value: "kadin" },
  { label: "Erkek", value: "erkek" },
];

export default function FormCall() {

  return (
    <div>
      <FormSimple>
        <input type="text" name="ad" placeholder="Adiniz" />
        <input type="email" name="email" placeholder="E-posta" />
        <input type="number" name="yas" placeholder="Yasiniz" />
      </FormSimple>
      <FormSpecial onSubmit={(data) => console.log("Form Verisi: ", data)}>
        <FormInput name="ad" label="Adiniz" placeholder="Adinizi girin" required/>
        <FormInput name="email" label="Email" placeholder="Emailinizi girin" required/>
        <FormSelect name="cinsiyet" label="Cinsiyet" options={GENDER_OPTIONS} required/>
        <FormCheckbox name="sozlesme" label=" Sartlari kabul ediyorum." required/>
        <button type="submit">Submit</button>
      </FormSpecial>
    </div>
  );
}
