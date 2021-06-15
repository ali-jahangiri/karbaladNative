const numberSeparator = number => {
    const endResult = [];
  String(number)
    .split("")
    .reverse()
    .forEach((el, index) => {
      if (!(index % 3) && index) endResult.push(",");
      endResult.push(el);
    });
  return endResult.reverse().join("");
}


export default numberSeparator;