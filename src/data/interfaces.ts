import React, { Dispatch, SetStateAction } from 'react';

export interface SearchCardData {
  datetaken: string;
  id: string;
  tags: string;
  title: string;
  url_l: string;
}

export interface ApiResponse {
  photos: {
    page: number;
    pages: number;
    perpage: number;
    photo: SearchCardData[];
    total: number;
  };
}

export interface ApiAction {
  type: string;
  payload: ApiResponse;
}

export interface SortAction {
  type: string;
}

export type SortTypes =
  | 'date-posted-desc'
  | 'date-posted-asc'
  | 'date-taken-desc'
  | 'date-taken-asc';

export type SortActions = 'POSTED_DESC' | 'POSTED_ASC' | 'DATE_DESC' | 'DATE_ASC';

export interface PaginationAction {
  type: string;
  payload: number;
}

export interface PaginationData {
  page: number;
  pages: number;
  perpage: number;
}

export interface SearchInfo extends SearchCardData {
  isShown: boolean;
}

export interface SearchInfoAction {
  type: string;
  payload: SearchInfo;
}

export interface BoardsResponse {
  id: string;
  title: string;
}

export interface BoardsAction {
  type: string;
  payload: BoardsResponse[];
}

export interface ConfirmStatus {
  question: string;
  isOpen: boolean;
  proceed: null | ((value?: unknown) => void);
  cancel: null | ((reason?: unknown) => void);
}

export interface ConfirmAction {
  type: string;
  payload: Partial<ConfirmStatus>;
}

export interface AppContextData {
  lang: string;
  switchLang: Dispatch<React.SetStateAction<string>>;
  apiPhotos: ApiResponse;
  dispatchApiQuery: Dispatch<ApiAction>;
  sort: SortTypes;
  dispatchSort: Dispatch<SortAction>;
  pagination: PaginationData;
  dispatchPagination: Dispatch<PaginationAction>;
  searchInfo: SearchInfo;
  dispatchSearchInfo: Dispatch<SearchInfoAction>;
  boards: BoardsResponse[];
  dispatchBoards: Dispatch<BoardsAction>;
  isAuth: boolean;
  setIsAuth: Dispatch<React.SetStateAction<boolean>>;
  confirm: ConfirmStatus;
  dispatchConfirm: Dispatch<ConfirmAction>;
}

export interface AuthPopupData {
  message: string;
  setIsPopupShown: Dispatch<SetStateAction<boolean>>;
}
