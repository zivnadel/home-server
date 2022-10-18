import React from "react";

interface Props {
  label?: string;
  icon?: React.ReactNode;
  initialValue?: string;
  type?: "text" | "password";
  value?: string;
  required?: boolean;
  error?: string | boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  className?: string;
}

const Input: React.FC<Props> = ({
  label,
  icon,
  initialValue,
  value,
  type = "text",
  onChange,
  className,
  required,
  error,
}) => {
  const [touched, setTouched] = React.useState(false);

  return (
    <div className={className}>
      <label
        htmlFor="input-group-1"
        className="block mb-2 text-sm text-light text-right font-medium"
      >
        {label}
      </label>
      <div className="relative">
        <div
          className={`${
            error && "text-red-500"
          } flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none`}
        >
          {icon}
        </div>
        <input
          type={type}
          required={required}
          value={touched ? value : initialValue || ""}
          onChange={(e) => {
            setTouched(true);
            onChange(e);
          }}
          className={`bg-gray-50 border ${
            error
              ? "border-red-500 text-red-500"
              : "border-gray-300 text-gray-900"
          } text-sm rounded-lg text-right focus:ring-primary focus:border-primary block w-full pl-10 p-2.5`}
        />
      </div>
      <div className="mb-6">
        {error && (
          <p className="mt-1 w-full text-right text-sm font-bold text-red-500">
            {error}
          </p>
        )}
      </div>
    </div>
  );
};

export default Input;
