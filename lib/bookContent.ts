import bookData from "@/data/book.json";

export interface BookPage {
  id: string;
  pageNumber: number;
  title: string;
  content: string;
  chapter: string;
}

export interface Chapter {
  id: string;
  title: string;
  pageStart: number;
  pageEnd: number;
}

export interface BookData {
  title: string;
  author: string;
  pages: BookPage[];
  chapters: Chapter[];
}

export const getBookData = (): BookData => {
  return bookData as BookData;
};

export const getPageById = (pageId: string): BookPage | undefined => {
  const book = getBookData();
  return book.pages.find((page) => page.id === pageId);
};

export const getAllPages = (): BookPage[] => {
  const book = getBookData();
  return book.pages;
};

export const getTotalPages = (): number => {
  const book = getBookData();
  return book.pages.length;
};

export const getPageByNumber = (pageNumber: number): BookPage | undefined => {
  const book = getBookData();
  return book.pages.find((page) => page.pageNumber === pageNumber);
};

export const getNextPage = (currentPageId: string): BookPage | null => {
  const book = getBookData();
  const currentIndex = book.pages.findIndex((page) => page.id === currentPageId);
  if (currentIndex === -1 || currentIndex === book.pages.length - 1) {
    return null;
  }
  return book.pages[currentIndex + 1];
};

export const getPreviousPage = (currentPageId: string): BookPage | null => {
  const book = getBookData();
  const currentIndex = book.pages.findIndex((page) => page.id === currentPageId);
  if (currentIndex <= 0) {
    return null;
  }
  return book.pages[currentIndex - 1];
};

export const getChapters = (): Chapter[] => {
  const book = getBookData();
  return book.chapters;
};

export const getReadingProgress = (currentPageId: string): number => {
  const book = getBookData();
  const currentIndex = book.pages.findIndex((page) => page.id === currentPageId);
  if (currentIndex === -1) {
    return 0;
  }
  return Math.round(((currentIndex + 1) / book.pages.length) * 100);
};
