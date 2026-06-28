const copyToClipboard = (value: string | number | boolean) => {
  if (!value) return;
  navigator.clipboard.writeText(String(value));
};

export default copyToClipboard;
