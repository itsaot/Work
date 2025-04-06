import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { useEffect } from "react"
import { useLocation } from "wouter"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function ScrollToTop() {
  const [location] = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  
  return null;
}
