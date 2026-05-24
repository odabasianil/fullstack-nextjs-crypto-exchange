export function formatPrice(price: number, unit: number){
  let formattedPrice;

  switch (unit) {
    case 0.01:
      formattedPrice = price.toFixed(2);
      break;
    case 0.1:
      formattedPrice = price.toFixed(1);
      break;
    case 1:
      formattedPrice = Math.round(price);
      break;
    case 10:
      formattedPrice = Math.round(price / 10) * 10;
      break;
    case 100:
      formattedPrice = Math.round(price / 100) * 100;
      break;
    default:
      formattedPrice = price;
  }

  return formattedPrice;
}