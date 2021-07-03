import { useField } from "formik";

export const InputField = ({ label, name, ...props }) => {
  const [field, meta] = useField(name);
  return (
    <div>
      <div>
        <label htmlFor={name}>{label}</label>
        <input id={`${name}`} {...field} {...props} />
      </div>
      {meta.error && meta.touched && <div>{meta.error}</div>}
    </div>
  );
};
