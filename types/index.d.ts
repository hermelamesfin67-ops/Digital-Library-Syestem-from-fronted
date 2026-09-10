type Book = {
  id: number;
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
  id: string;
  name: string;
  icon: string;
  description: string;
  Book_count: number;
};

type Borrows = {
  user_Display: string;
  created_at: Date;
  due_date: Date;
  status: string;
  items: {
    book: number;
    borrow: number;
    quantity: number;
    book_title: string;
  }[];
};
