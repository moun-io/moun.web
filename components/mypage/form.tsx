export function Box({
  children,
  label,
  description,
  required = false,
}: {
  children: React.ReactNode;
  label: string;
  description?: string;
  required?: boolean;
}) {
  return (
    <div className="w-full border-neutral-300 border-solid border rounded-2xl p-6">
      <label className="block font-bold">
        {label} {required && <p className="inline"> * </p>}
      </label>
      {description && (
        <div className="text-neutral-400 text-sm mt-4">{description}</div>
      )}
      <div className="mt-8">{children}</div>
    </div>
  );
}

export function TextInput({
  placeholder,
  name,
  value,
  onChange,
  defaultValue,
  required = false,
}: {
  placeholder: string;
  name: string;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  defaultValue?: string;
  required?: boolean;
}) {
  return (
    <input
      onChange={onChange}
      value={value}
      className="w-full bg-neutral-100 rounded-lg p-4"
      type="text"
      name={name}
      placeholder={placeholder}
      defaultValue={defaultValue}
      required={required}
    />
  );
}
