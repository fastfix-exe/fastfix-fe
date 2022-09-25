const TextInput = (props) => {
  return (
    <input
      className="w-full p-4 text-xl bg-light-gray rounded-md"
      placeholder={props.placeholder}
      type="text"
      name={props.name}
      value={props.value}
      onChange={props.onChange}
      disabled={props.disabled}
      autoComplete="off"
    />
  );
};

export default TextInput;
