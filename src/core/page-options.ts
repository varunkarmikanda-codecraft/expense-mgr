import type { Friend } from "../models/friend.model.js";

export interface PageOptions { 
  offset: number, 
  linit: number 
}

export interface PageResult<T> {
  data: T[];
  matched: number;
  total: number;
}