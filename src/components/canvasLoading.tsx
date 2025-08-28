import Link from "next/link";
import { Skeleton } from "./ui/skeleton";
import { ArrowLeft } from "lucide-react";

// Loading component
export const CanvasLoading = () => {
    return (
        <div className="bg-background flex h-screen w-full flex-col">
            {/* Header skeleton */}
            <header className="bg-background border-border z-20 flex h-13 items-center border-b px-4 backdrop-blur-sm">
                <div className="mx-auto flex w-full max-w-screen-2xl items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <Link href="/dashboard" className="text-foreground-secondary">
                            <ArrowLeft size={20} />
                        </Link>
                        <div className="bg-border h-6 w-px"></div>
                        <Skeleton className="h-6 w-32" /> {/* Room title skeleton */}
                    </div>
                    <div className="flex items-center space-x-2">
                        <Skeleton className="h-8 w-8" /> {/* Settings button */}
                    </div>
                </div>
            </header>

            {/* Main content skeleton */}
            <main className="fixed right-0 left-0 h-screen overflow-y-auto">
                {/* Center button skeleton */}
                <div className="bg-background-secondary shadow-soft absolute bottom-4 left-50 z-10 flex -translate-x-1/2 items-center justify-center gap-3 rounded-lg px-2 py-1">
                    <Skeleton className="h-4 w-48" />
                </div>

                {/* Users section skeleton */}
                <div className="absolute top-20 right-6 z-10 flex gap-3 rounded-lg bg-white p-1">
                    <div className="flex items-center justify-between pr-2">
                        <div className="flex w-full max-w-36 gap-2 p-3">
                            <Skeleton className="h-8 w-8 rounded-full" />
                            <Skeleton className="h-8 w-8 rounded-full" />
                        </div>
                        <Skeleton className="h-8 w-8" />
                    </div>
                </div>

                {/* Voice chat skeleton */}
                <div className="absolute top-20 right-6 z-10">
                    <Skeleton className="h-10 w-16 rounded-lg" />
                </div>

                {/* Canvas area */}
                <div className="bg-background-secondary h-full w-full flex items-center justify-center">
                    <div className="text-center space-y-4">
                        <Skeleton className="h-8 w-8 rounded-full mx-auto animate-spin" />
                        <Skeleton className="h-4 w-32" />
                    </div>
                </div>

                {/* Toolbar skeleton */}
                <div className="bg-background-secondary border-border shadow-soft fixed bottom-6 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 rounded-lg border px-3 py-2">
                    <Skeleton className="h-8 w-8" />
                    <Skeleton className="h-8 w-8" />
                    <Skeleton className="h-8 w-8" />
                    <Skeleton className="h-8 w-8" />
                    <Skeleton className="h-8 w-8" />
                    <Skeleton className="h-8 w-8" />
                    <Skeleton className="h-8 w-8" />
                    <Skeleton className="h-8 w-8" />
                </div>
            </main>
        </div>
    );
};