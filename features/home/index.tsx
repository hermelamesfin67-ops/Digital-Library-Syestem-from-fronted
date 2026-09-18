"use client"
import { useFetchData } from "@/api/use-fetch-data"
import { queryKeys } from "@/api/query-keys"
import BookLoader from "@/components/shared/book-loader"
import PageHeader from "@/components/shared/page-header"
import { Sparkles } from "lucide-react"
import Slider from "react-slick";
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import image from "../../public/library.jpeg"
import image1 from "../../public/library1.jpeg"
import image2 from "../../public/library2.jpeg"
import Image from "next/image";
import { useMemo, useState } from "react"
import BookCard from "./book-card"

const images = [image, image1, image2]

function SampleNextArrow() {
    return (
        <div />
    );
}

function SamplePrevArrow() {
    return (
        <div />
    );
}


function HomePage() {
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const booksData = useFetchData(
        [queryKeys.getAllBooks],
        "api/books/",
        undefined,
        undefined,
        true
    )
    const books: Book[] = booksData.data

    const categories = useMemo(() => {
        const set = new Set(books?.map((b) => b.category_display));
        return ['all', ...Array.from(set)];
    }, [books]);

    const filteredBooks = useMemo(() => {
        return books
            ?.filter((book) => {
                const matchesCategory =
                    selectedCategory === 'all' || book.category_display === selectedCategory;

                return matchesCategory;
            })
    }, [books, selectedCategory]);

    const settings = {
        dots: false,
        infinite: true,
        speed: 5000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        cssEase: "linear",
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />
    };

    return (
        <div className="flex flex-col gap-5 w-full mx-auto max-w-5xl p-5">
            <div className="text-center py-5">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-stone-900 font-sans">
                    Library Management System
                </h2>
                <p className="text-xs sm:text-sm text-stone-600 max-w-2xl mx-auto mt-1.5 font-normal">
                    Explore physical volumes, borrow Ethiopian & world literary classics, access digital e-book previews, and manage your patron circulation.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 min-h-55 sm:min-h-65 md:min-h-75">
                <div className="bg-linear-to-br from-[#eff6ff] via-[#f8fafc] to-[#e2e8f0] p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden">
                    {/* Background Shelf Lines & Books Aesthetic */}
                    <div className="absolute right-0 top-0 bottom-0 w-36 sm:w-56 opacity-25 pointer-events-none">
                        <svg viewBox="0 0 200 300" className="w-full h-full">
                            {/* Horizontal bookshelf lines */}
                            <rect x="10" y="40" width="180" height="8" fill="#3b82f6" />
                            <rect x="10" y="110" width="180" height="8" fill="#3b82f6" />
                            <rect x="10" y="180" width="180" height="8" fill="#3b82f6" />
                            <rect x="10" y="250" width="180" height="8" fill="#3b82f6" />
                            {/* Vertical book spines */}
                            <rect x="25" y="12" width="14" height="28" fill="#2563eb" rx="1" />
                            <rect x="42" y="10" width="16" height="30" fill="#0284c7" rx="1" />
                            <rect x="61" y="14" width="12" height="26" fill="#0369a1" rx="1" />
                            <rect x="85" y="8" width="18" height="32" fill="#1d4ed8" rx="1" />
                            <rect x="120" y="75" width="14" height="35" fill="#2563eb" rx="1" />
                            <rect x="137" y="70" width="18" height="40" fill="#0284c7" rx="1" />
                            <rect x="158" y="78" width="15" height="32" fill="#1e40af" rx="1" />
                        </svg>
                    </div>

                    {/* Main Visual Scene: Girl studying with desktop computer, tablet, stack of books, and potted plant */}
                    <div className="relative z-10 flex items-center justify-between gap-4">
                        <div className="max-w-xs sm:max-w-sm">
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-blue-100/90 text-blue-800 border border-blue-200">
                                <Sparkles className="w-3 h-3 text-blue-600" />
                                E-Resources & Physical Catalog
                            </span>
                            <h3 className="text-lg sm:text-xl font-bold text-stone-900 mt-2 leading-snug">
                                Smart Digital Learning & Archival Access
                            </h3>
                            <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                                Instant search across Ethiopian masterpieces, STEM literature, and global classics with live copy tracking.
                            </p>
                        </div>

                        {/* Digital Study Station Vector Art */}
                        <div className="hidden sm:flex shrink-0 w-36 h-36 md:w-44 md:h-44 items-center justify-center">
                            <svg viewBox="0 0 160 160" className="w-full h-full drop-shadow-md">
                                {/* Computer Monitor */}
                                <rect x="25" y="25" width="80" height="55" rx="4" fill="#0f172a" />
                                <rect x="28" y="28" width="74" height="49" rx="2" fill="#38bdf8" opacity="0.9" />
                                <rect x="33" y="34" width="40" height="4" rx="1" fill="#ffffff" />
                                <rect x="33" y="42" width="60" height="3" rx="1" fill="#ffffff" opacity="0.8" />
                                <rect x="33" y="48" width="55" height="3" rx="1" fill="#ffffff" opacity="0.8" />
                                <rect x="33" y="54" width="45" height="3" rx="1" fill="#ffffff" opacity="0.8" />
                                {/* Monitor Stand */}
                                <rect x="60" y="80" width="10" height="15" fill="#334155" />
                                <rect x="48" y="95" width="34" height="4" rx="2" fill="#475569" />

                                {/* Desk Surface */}
                                <rect x="10" y="99" width="140" height="5" rx="1" fill="#94a3b8" />

                                {/* Tablet device */}
                                <rect x="88" y="86" width="24" height="13" rx="2" fill="#1e293b" />
                                <rect x="90" y="88" width="20" height="9" rx="1" fill="#e2e8f0" />

                                {/* Book stacks on desk */}
                                <rect x="18" y="91" width="26" height="4" rx="1" fill="#ef4444" />
                                <rect x="16" y="95" width="30" height="4" rx="1" fill="#3b82f6" />

                                {/* Potted Plant */}
                                <polygon points="126,99 138,99 135,88 129,88" fill="#d97706" />
                                <circle cx="132" cy="84" r="5" fill="#16a34a" />
                                <circle cx="127" cy="80" r="4" fill="#22c55e" />
                                <circle cx="137" cy="81" r="4" fill="#15803d" />

                                {/* Sitting Reader Character Silhouette */}
                                <circle cx="70" cy="115" r="7" fill="#0284c7" />
                                <path d="M 62 125 Q 70 120 78 125 L 75 145 L 65 145 Z" fill="#0369a1" />
                                <path d="M 72 126 L 86 116 L 89 122 L 75 132 Z" fill="#38bdf8" />
                            </svg>
                        </div>
                    </div>

                </div>

                <div className="slider-container">
                    <Slider {...settings} className="space-x-3">
                        {images?.map((image, i) => (
                            <div key={i} className="h-72">
                                <Image src={image} alt="Image"
                                    width={100}
                                    height={100}
                                    className="flex items-center justify-center w-full h-full" />
                            </div>
                        ))}
                    </Slider>
                </div>

            </div>


            <div className="flex flex-col gap-3 py-5">
                <PageHeader title="Available Books in the Library" desc={
                    <p className="text-xs sm:text-sm text-stone-500 mt-1">
                        Featuring beloved Ethiopian classics like <span className="font-semibold text-stone-800">{"ፍቅር እስከ መቃብር"}</span>, world bestsellers like <span className="font-semibold text-stone-800">{"The Alchemist"}</span>, and computer science textbooks.
                    </p>
                } />

                <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                    {categories.map((cat) => {
                        const isSelected = selectedCategory === cat;
                        const label = cat === 'all' ? 'All Collections' : cat;
                        return (
                            <button
                                key={cat}
                                type="button"
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-all ${isSelected
                                    ? 'bg-stone-900 text-white shadow-2xs'
                                    : 'bg-white border border-stone-200 text-stone-600 hover:bg-stone-100 hover:text-stone-900'
                                    }`}
                            >
                                {label}
                            </button>
                        );
                    })}
                </div>
                <div className="grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 lg:gap-5">
                    {
                        booksData.isFetching ?
                            Array(20).fill(0).map((_, i) => (
                                <BookLoader key={i} />
                            ))
                            : filteredBooks?.length ?
                                filteredBooks?.map((book) => (
                                    <BookCard key={book.id} book={book} />
                                ))
                                : "No Book Found!"
                    }
                </div>
            </div>

        </div>
    )
}

export default HomePage