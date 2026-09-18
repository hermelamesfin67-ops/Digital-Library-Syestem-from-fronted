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

interface ChartItem {
  name: string;
  value: number;
}

interface LibraryStatsData {
  total_users: number;
  total_books: number;
  total_copies: number;
  available_copies: number;
  borrowed: number;
  overdue: number;
  chart: ChartItem[];
}

interface BookRecord {
  id: string;
  isbn: string;
  title: string;
  author: string;
  category: string;
  totalCopies: number;
  availableCopies: number;
  borrowedCopies: number;
  overdueCopies: number;
  location: string;
}

interface UserRecord {
  id: string;
  name: string;
  email: string;
  role: "Student" | "Faculty" | "Researcher" | "Community Member";
  activeLoans: number;
  overdueLoans: number;
  joinedDate: string;
  cardId: string;
}

interface CirculationActivity {
  id: string;
  bookTitle: string;
  userName: string;
  action: "Checkout" | "Returned" | "Renewed";
  timestamp: string;
  dueDate: string;
  status: "active" | "returned" | "overdue";
}
