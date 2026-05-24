export const getBuySellRatio = (data:any) => {
  let buyCount = 0;
  let sellCount = 0;

  data?.forEach((item: any) => {
    if (item.is_buy) {
      buyCount++;
    } else {
      sellCount++;
    }
  });

  const totalCount = buyCount + sellCount;
  const buyRatio = Math.round((buyCount / totalCount) * 100);
  const sellRatio = Math.round((sellCount / totalCount) * 100);

  return { buyRatio, sellRatio };
};
