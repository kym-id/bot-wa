export function makeId(length: number) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

export function validateQRSouvenir(str: string) {
  const tag = "@kym-voucher";
  if (!str.endsWith(tag)) return false;
  str = str.replace(tag, "");
  if (str.length !== 20) return false;
  return true;
}
