export const removeColorSymbols = (str: string) => {
  return str.replace(/\u001b\[\d+m/g, '');
}
