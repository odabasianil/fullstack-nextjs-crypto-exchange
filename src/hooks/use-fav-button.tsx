'use client';

import { Icon } from "@/components/ui/icon";
import { FavoriteItem } from "@/core/models/auth/models/favorite.model";
import { favoriteService } from "@/core/services/user/favorite.service";
import { RootState } from "@/core/store/store";
import clsx from "clsx";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useToast } from "./use-toast";


interface FavButtonProps {
  label?: string;
  size?: number;
  className?: string;
  iconClassName?: string;
}

const useFavButton = (TenantPairSpotId: number, isActive?: boolean, setIsActive?: any) => {
  const session = useSelector((state: RootState) => state.auth.session);
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const toast = useToast();

  const addFavorite = () => {
    console.log('TenantPairSpotId', TenantPairSpotId);
    favoriteService.addFavorite({
      TenantPairSpotId: TenantPairSpotId ?? 0
    }).then((res) => {
      if (res.success) {
        setIsActive(true);
      } else {
        toast?.open(res.messageList[0].message, 'circle-close', '', 'text-error')
      }
    });
  }

  const removeFavorite = (TenantPairSpotId: number) => {
    console.log('TenantPairSpotId', TenantPairSpotId);
    favoriteService.deleteFavorite({
      TenantPairSpotId: TenantPairSpotId
    }).then((res) => {
      if (res.success) {
        setIsActive(false);
      } else {
        toast?.open(res.messageList[0].message, 'circle-close', '', 'text-error')
      }
    });
  }

  const handleClick = useCallback((e: any) => {
    e.preventDefault();

    const routeUrl = `/login`;
    if (!session) {
      window.location.href = routeUrl;
    } else {
      if (isActive) {
        removeFavorite(TenantPairSpotId);
      } else {
        addFavorite();
      }
    }
  }, [isActive, session]);

  const getFavorites = () => {
    favoriteService.favoriteList().then((res) => {
      if (res.data) {
        setFavorites(res.data);
      }
    });
  }

  const FavButton = useMemo(() => {
    const View = (props: FavButtonProps) => (
      <button
        className={clsx(
          'mr-2 border border-white-100 dark:border-secondary rounded-md w-6 h-6 flex items-center justify-center',
          props.className
        )}
        onClick={handleClick}
        aria-label="favourite"
        data-testid="favourites-icon"
      >
        <Icon
          name="star"
          size={props.size ?? 24}
          className={clsx(isActive ? 'text-primary-100' : 'text-[rgb(234,236,239)] dark:text-[rgb(71,77,87)]')}
        />
        {props.label && <span className="ml-2">{props.label}</span>}
      </button>
    );

    return View;
  }, [isActive, handleClick]);

  return {
    FavButton
  };
};

export default useFavButton;
