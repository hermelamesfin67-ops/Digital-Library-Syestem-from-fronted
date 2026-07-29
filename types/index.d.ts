type Book = {
  id: string;
  title: string;
  image: string;
  author_display: string;
  category_display: string;
  category_name: string;
  author_name: string;
  total_copies: string;
  available_copies: string;
};

type Authors = {
  id: number;
  name: string;
  biography: string;
  book_count: number;
  image: string;
};

type Categories = {
  id: number;
  name: string;
  descriptions: string;
};
