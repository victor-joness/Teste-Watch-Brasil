export function generateId(length = 9) {
  let id = "";
  for (let i = 0; i < length; i++) {
    id += Math.floor(Math.random() * 10);
  }
  return parseInt(id);
}
