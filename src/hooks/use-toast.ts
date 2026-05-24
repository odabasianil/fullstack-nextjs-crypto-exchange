"use client"

import { ToastContext } from "@/components/toast-context";
import { useContext } from "react";

export const useToast = () => useContext(ToastContext);