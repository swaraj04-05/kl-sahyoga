import React, { useState, useEffect, useCallback, useRef } from 'react';
import SearchBar from '../components/SearchBar';
import CategoryChips from '../components/CategoryChips';
import PostCard from '../components/PostCard';
import PostCardSkeleton from '../components/PostCardSkeleton';
import EmptyState from '../components/EmptyState';
import FilterSheet from '../components/FilterSheet';
import { getPosts } from '../services/api';
import { Post, PostType, Category } from '../types';

const PULL_THRESHOLD = 80;

const RequestsScreen: React.FC = () => {
    const [requests, setRequests] = useState<Post[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [isFilterSheetOpen, setIsFilterSheetOpen] = useState(false);

    const touchStartY = useRef(0);
    const [pullDistance, setPullDistance] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    const fetchRequests = useCallback(async (filters = {}) => {
        setIsLoading(true);
        try {
            const fetchedRequests = await getPosts(PostType.REQUEST, filters);
            setRequests(fetchedRequests);
        } catch (error) {
            console.error("Failed to fetch requests:", error);
        } finally {
            setIsLoading(false);
            setIsRefreshing(false);
            setPullDistance(0);
        }
    }, []);

    useEffect(() => {
        fetchRequests();
    }, [fetchRequests]);
    
    const handleApplyFilters = (filters: { category: Category | 'All'; urgent: boolean; sort: string }) => {
        setIsFilterSheetOpen(false);
        fetchRequests(filters);
    };

    const handleTouchStart = (e: React.TouchEvent) => {
        if (containerRef.current?.scrollTop === 0) {
            touchStartY.current = e.targetTouches[0].clientY;
        } else {
            touchStartY.current = 0;
        }
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (touchStartY.current > 0) {
            const currentY = e.targetTouches[0].clientY;
            const distance = currentY - touchStartY.current;
            if (distance > 0) {
                e.preventDefault();
                setPullDistance(Math.min(distance, PULL_THRESHOLD + 20));
            }
        }
    };

    const handleTouchEnd = () => {
        if (pullDistance > PULL_THRESHOLD) {
            setIsRefreshing(true);
            fetchRequests();
        } else {
            setPullDistance(0);
        }
        touchStartY.current = 0;
    };


    const EmptyIcon = () => (
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" /></svg>
    );

    return (
        <div 
            ref={containerRef}
            className="flex flex-col h-full relative"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            style={{ overflowY: pullDistance > 0 ? 'hidden' : 'auto' }}
        >
            <div 
                className="absolute top-0 left-0 right-0 flex justify-center items-center transition-transform duration-200"
                style={{ transform: `translateY(${Math.min(pullDistance, PULL_THRESHOLD)}px)`, zIndex: 0 }}
            >
                <div className={`mt-4 p-2 bg-white dark:bg-slate-800 rounded-full shadow-lg ${isRefreshing ? 'animate-spin' : ''}`} style={{ opacity: Math.min(pullDistance / PULL_THRESHOLD, 1) }}>
                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
                </div>
            </div>

            <div className="px-4 pt-4 pb-2">
                <SearchBar onFilterClick={() => setIsFilterSheetOpen(true)} />
            </div>
            <CategoryChips />
            <div className="flex-grow overflow-y-auto" style={{ transform: `translateY(${pullDistance}px)` }}>
                <div className="px-4 pt-2">
                    <h2 className="text-xl font-bold text-slate-800 dark:text-white">Active Requests</h2>
                </div>
                {isLoading && !isRefreshing ? (
                    <>
                        <PostCardSkeleton />
                        <PostCardSkeleton />
                    </>
                ) : requests.length > 0 ? (
                    requests.map(post => <PostCard key={post.id} post={post} />)
                ) : (
                    <div className="mt-10">
                        <EmptyState 
                            icon={<EmptyIcon />}
                            title="No Active Requests"
                            message="It looks like everyone in the community has what they need right now. Check back later!"
                        />
                    </div>
                )}
            </div>
            <FilterSheet 
                isOpen={isFilterSheetOpen}
                onClose={() => setIsFilterSheetOpen(false)}
                onApply={handleApplyFilters}
            />
        </div>
    );
};

export default RequestsScreen;