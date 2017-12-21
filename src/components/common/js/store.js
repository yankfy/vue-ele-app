export function saveToLocal(id, key, value) {
  let seller = localStorage._seller_
  if (!seller) {
    seller = {}
    seller[id] = {}
  } else {
    // console.log(seller)
    seller = JSON.parse(seller)
    if (!seller[id]) {
      seller[id] = {}
    }
  }
  seller[id][key] = value
  localStorage._seller_ = JSON.stringify(seller)
}

export function loadFromLocal(id, key, def) {
  let seller = localStorage._seller_
  if (!seller) {
    return def
  }
//   console.log(seller)
  let sellerId = JSON.parse(seller)[id]
  if (!sellerId) {
    return def
  }
  let value = sellerId[key]
//   console.log(value)
  return value || def
}
