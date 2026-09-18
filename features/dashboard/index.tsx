"use client"
import { queryKeys } from '@/api/query-keys'
import { useFetchData } from '@/api/use-fetch-data'
import { StatCard } from '@/features/dashboard/stat-card'
import {
    Users,
    BookOpen,
    Layers,
    CheckCircle2,
    BookmarkCheck,
    AlertCircle,
} from 'lucide-react';
import { CirculationCharts } from './circulation-chart';
import { useSession } from 'next-auth/react';
import { ROLE } from '@/constants';
import BookLoader from '@/components/shared/book-loader';

function Dashboard() {
    const { data: session } = useSession()
    const role = session?.user?.user?.role || session?.user.user.account_type

    const dashboardData = useFetchData(
        [queryKeys.getAllDashboard],
        "api/dashboard/"
    )
    const dashboard = dashboardData?.data

    const availabilityPct =
        dashboard?.total_copies > 0
            ? ((dashboard?.available_copies / dashboard?.total_copies) * 100).toFixed(1)
            : '0.0';
    const borrowedPct =
        dashboard?.total_copies > 0
            ? ((dashboard?.borrowed / dashboard?.total_copies) * 100).toFixed(1)
            : '0.0';
    if (dashboardData.isFetching) return <div className='flex flex-col gap-5'>
        <BookLoader />
        <BookLoader />
        <BookLoader />
    </div>

    return (
        <div className="flex flex-col gap-5">
            {/* Metrics */}
            <section
                id="kpi-metrics-grid"
                aria-label="Key Performance Indicators"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5"
            >
                {(role === ROLE.Librarian || role === ROLE.Superuser) &&
                    <StatCard
                        id="stat-total-users"
                        title="Total Users"
                        value={dashboard?.total_users}
                        subtitle="Registered users"
                        badgeText="Active"
                        badgeType="info"
                        icon={Users}
                        iconBgColor="bg-sky-50"
                        iconColor="text-sky-700"
                    />
                }
                {(role === ROLE.Librarian || role === ROLE.Superuser) &&
                    <StatCard
                        id="stat-total-books"
                        title="Total Books"
                        value={dashboard?.total_books}
                        subtitle="Unique catalog titles"
                        badgeText="Catalog"
                        badgeType="neutral"
                        icon={BookOpen}
                        iconBgColor="bg-indigo-50"
                        iconColor="text-indigo-700"
                    />
                }
                {(role === ROLE.Librarian || role === ROLE.Superuser) &&
                    <StatCard
                        id="stat-total-copies"
                        title="Total Copies"
                        value={dashboard?.total_copies}
                        subtitle="Physical volume count"
                        badgeText="Inventory"
                        badgeType="neutral"
                        icon={Layers}
                        iconBgColor="bg-stone-100"
                        iconColor="text-stone-800"
                    />
                }
                {(role === ROLE.Librarian || role === ROLE.Superuser) &&
                    <StatCard
                        id="stat-available-copies"
                        title="Available"
                        value={dashboard?.available_copies}
                        subtitle="Ready on shelves"
                        badgeText={`${availabilityPct}%`}
                        badgeType="success"
                        icon={CheckCircle2}
                        iconBgColor="bg-emerald-50"
                        iconColor="text-emerald-700"
                    />
                }
                {(role === ROLE.Librarian || role === ROLE.Superuser) &&
                    <StatCard
                        id="stat-borrowed-copies"
                        title="Borrowed"
                        value={dashboard?.borrowed}
                        subtitle="Active loans"
                        badgeText={`${borrowedPct}%`}
                        badgeType="warning"
                        icon={BookmarkCheck}
                        iconBgColor="bg-amber-50"
                        iconColor="text-amber-800"
                    />
                }
                {(role === ROLE.Librarian || role === ROLE.Superuser) &&
                    <StatCard
                        id="stat-overdue-copies"
                        title="Overdue"
                        value={dashboard?.overdue}
                        subtitle="Requires collection"
                        badgeText={dashboard?.overdue === 0 ? 'Clear' : 'Action Req'}
                        badgeType={dashboard?.overdue === 0 ? 'success' : 'warning'}
                        icon={AlertCircle}
                        iconBgColor={dashboard?.overdue === 0 ? 'bg-stone-100' : 'bg-rose-50'}
                        iconColor={dashboard?.overdue === 0 ? 'text-stone-500' : 'text-rose-700'}
                    />
                }
                {role === ROLE.Student &&
                    <StatCard
                        id="borrowed"
                        title="My Borrowed"
                        value={dashboard?.my_borrowed}
                        subtitle="Active Borrowed"
                        icon={BookmarkCheck}
                        iconBgColor="bg-amber-50"
                        iconColor="text-amber-800"
                    />
                }
                {role === ROLE.Student &&
                    <StatCard
                        id="returned"
                        title="Returned Books"
                        value={dashboard?.my_returned}
                        subtitle="Returned to the shelves"
                        icon={CheckCircle2}
                        iconBgColor="bg-emerald-50"
                        iconColor="text-emerald-700"
                    />
                }
                {role === ROLE.Student &&
                    <StatCard
                        id="stat-overdue-copies"
                        title="Overdue"
                        value={dashboard?.my_overdue}
                        subtitle="Requires collection"
                        badgeText={dashboard?.my_overdue === 0 ? 'Clear' : 'Action Req'}
                        badgeType={dashboard?.my_overdue === 0 ? 'success' : 'warning'}
                        icon={AlertCircle}
                        iconBgColor={dashboard?.my_overdue === 0 ? 'bg-stone-100' : 'bg-rose-50'}
                        iconColor={dashboard?.my_overdue === 0 ? 'text-stone-500' : 'text-rose-700'}
                    />
                }
            </section>

            {(role === ROLE.Librarian || role === ROLE.Superuser) &&
                <div className="space-y-6">
                    <CirculationCharts
                        chartData={dashboard?.chart}
                        totalCopies={dashboard?.total_copies}
                        availableCopies={dashboard?.available_copies}
                        borrowedCopies={dashboard?.borrowed}
                        overdueCopies={dashboard?.overdue}
                    />
                </div>
            }
        </div>
    )
}

export default Dashboard