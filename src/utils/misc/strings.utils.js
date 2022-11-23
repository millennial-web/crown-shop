export function toTitleCase(str){
  const arr = str.split(" ");
  //loop through each element of the array and capitalize the first letter.
  for (var i = 0; i < arr.length; i++) {
    arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
  }
  //Join all the elements of the array back into a string using a blankspace as a separator 
  const str2 = arr.join(" ");
  return str2;
}


export function getTitleURL(str){
  if(!str){
    // console.log('getTitleURL error: empty str passed');
    return '';
  }
  const arr = str.split(" ");
  //loop through each element of the array and lower case each.
  for (var i = 0; i < arr.length; i++) {
    arr[i] = arr[i].toLowerCase();
  }
  //Join all the elements of the array back into a string using a - as a separator 
  const str2 = arr.join("-");
  return str2;
}

export function getCartItemHash(cartItem){
  if(!cartItem){
    console.error('cartItem error: no obj passed');
    return '';
  }
  let str = cartItem.id;
  if(cartItem.extensions){
    for (const [key, value] of Object.entries(cartItem.extensions)) {
      str+= `_${key}:${value}`;
    }
  }
  return str;
}

