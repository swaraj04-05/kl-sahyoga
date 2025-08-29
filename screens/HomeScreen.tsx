import React, { useState, useEffect, useCallback, useRef } from 'react';
import SearchBar from '../components/SearchBar';
import CategoryChips from '../components/CategoryChips';
import PostCard from '../components/PostCard';
import PostCardSkeleton from '../components/PostCardSkeleton';
import FilterSheet from '../components/FilterSheet';
import Toast from '../components/Toast';
import { getPosts, getNewPost } from '../services/api';
import { Post, Category, PostType } from '../types';

const PULL_THRESHOLD = 80;

const HomeScreen: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [isFilterSheetOpen, setIsFilterSheetOpen] = useState(false);
    const [showNewPostsToast, setShowNewPostsToast] = useState(false);
    const [newPost, setNewPost] = useState<Post | null>(null);

    // Pull-to-refresh state
    const touchStartY = useRef(0);
    const [pullDistance, setPullDistance] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);


    const fetchPosts = useCallback(async (filters = {}) => {
        setIsLoading(true);
        try {
            const fetchedPosts = await getPosts(PostType.DONATION, filters);
            setPosts(fetchedPosts);
        } catch (error) {
            console.error("Failed to fetch posts:", error);
        } finally {
            setIsLoading(false);
            setIsRefreshing(false);
            setPullDistance(0);
        }
    }, []);

    useEffect(() => {
        fetchPosts();
    }, [fetchPosts]);

    // Real-time update simulation
    useEffect(() => {
        const interval = setInterval(async () => {
            if (!showNewPostsToast && !newPost) {
                const newPostData = await getNewPost(PostType.DONATION);
                if (newPostData) {
                    setNewPost(newPostData);
                    setShowNewPostsToast(true);
                }
            }
        }, 10000); // Check for new posts every 10 seconds

        return () => clearInterval(interval);
    }, [showNewPostsToast, newPost]);

    const handleApplyFilters = (filters: { category: Category | 'All'; urgent: boolean; sort: string }) => {
        setIsFilterSheetOpen(false);
        fetchPosts(filters);
    };
    
    const handleShowNewPosts = () => {
        if (newPost) {
            setPosts(prevPosts => [newPost, ...prevPosts]);
        }
        setShowNewPostsToast(false);
        setNewPost(null);
    };

    // Pull-to-refresh handlers
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
            fetchPosts();
        } else {
            setPullDistance(0);
        }
        touchStartY.current = 0;
    };
    
    return (
        <div 
            ref={containerRef}
            className="flex flex-col h-full relative"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            style={{ overflowY: pullDistance > 0 ? 'hidden' : 'auto' }}
        >
            <Toast text="New posts available" isVisible={showNewPostsToast} onClick={handleShowNewPosts} />
            
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
                    <h2 className="text-xl font-bold text-slate-800 dark:text-white">Available Donations</h2>
                </div>
                {isLoading && !isRefreshing ? (
                    <>
                        <PostCardSkeleton />
                        <PostCardSkeleton />
                    </>
                ) : (
                    posts.map(post => <PostCard key={post.id} post={post} />)
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

export default HomeScreen;