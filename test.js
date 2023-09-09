const isLinkOrID = (inputString) => {
  if (/^\d+$/.test(inputString)) return "ID";
  if (/^(https?|www)/i.test(inputString)) return "Link";
  return false;
};

console.log(isLinkOrID("www.elhananfine.com")); // ידפיס "ID"
console.log(isLinkOrID("972556866871")); // ידפיס "Unknown"
