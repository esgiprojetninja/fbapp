
const addIfInferior = (num) => {
  return (parseInt(num) < 10) ? "0"+num : num
}

export const uiDateFormater = (d) => {
    d = new Date(d.substr(0, 10));
    return addIfInferior(d.getDate()) + "/" + addIfInferior(parseInt(d.getMonth())+1) + "/" + d.getFullYear()
}
