
export interface FavoriteItem {
  userFavoritePairId: number,
  tenantId: number,
  userId: number,
  tenantPairId: number,
  symbol: string,
  createDate: string,
  status: number
}


export interface FavoriteAdd {
  TenantPairSpotId: number,
}

export interface FavoriteDelete {
  TenantPairSpotId: number,
}
