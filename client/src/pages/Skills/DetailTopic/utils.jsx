export const formatData = (location, data) => {
    let str = "";
    let temp = "";
    let array = [];
    for (let i = location.length - 1; i >= 0; i--) {
      if (location[i] === "/") break;
      str += location[i];
    }
    temp = str.split("").reverse().join("");
    for (let i = 0; i < data.length; i++) {
      if (data[i].level.slugLevel === temp) {
        array.push(data[i]);
      }
    }
    return array;
  };
  