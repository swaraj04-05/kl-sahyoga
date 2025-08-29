import React, { useState } from 'react';
import { Post } from '../types';
import useHapticFeedback from '../hooks/useHapticFeedback';
import { updatePostInteraction } from '../services/api';

interface PostCardProps {
  post: Post;
}

const VerifiedIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-kl-blue"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" /></svg>
);

const HeartIcon = ({ className, filled }: { className?: string; filled: boolean }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={1.5} className={className}>
      <path d="M9.653 16.915l-.005-.003-.019-.01a20.759 20.759 0 01-1.162-.682 22.045 22.045 0 01-2.582-1.9-22.247 22.247 0 01-3.664-3.663A20.757 20.757 0 011.5 8.525c0-1.606 1.39-2.91 3.102-2.91 1.064 0 2.062.5 2.723 1.342A5.12 5.12 0 0110 5.513a5.12 5.12 0 012.675 1.452c.66-.842 1.66-1.342 2.723-1.342 1.712 0 3.102 1.304 3.102 2.91 0 1.353-.45 2.65-1.191 3.824a22.247 22.247 0 01-3.664 3.663 22.045 22.045 0 01-2.582 1.9 20.759 20.759 0 01-1.162.682l-.019.01-.005.003h-.002z" />
    </svg>
);

const HandRaisedIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}><path d="M10 2.5a.75.75 0 01.75.75v.51a4.53 4.53 0 012.87 2.593 4.5 4.5 0 01-1.823 5.421c-.506.24-1.02.483-1.52.735a.75.75 0 01-.702 0c-.5-.252-1.015-.495-1.52-.735a4.5 4.5 0 01-1.823-5.421 4.53 4.53 0 012.87-2.593V3.25A.75.75 0 0110 2.5zM8.5 12.5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5a.75.75 0 01.75-.75zM10 12.5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 12.5zM11.5 12.5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5a.75.75 0 01.75-.75z" /></svg>
);

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const [likes, setLikes] = useState(post.likes);
  const [interestedCount, setInterestedCount] = useState(post.interested);
  const [isLiked, setIsLiked] = useState(false);
  const [isInterested, setIsInterested] = useState(false);
  const triggerHapticFeedback = useHapticFeedback();

  const handleLike = () => {
    triggerHapticFeedback('medium');
    const newLikedState = !isLiked;
    setIsLiked(newLikedState);
    setLikes(likes + (newLikedState ? 1 : -1));
    updatePostInteraction(post.id, 'like', newLikedState ? 'increment' : 'decrement');
  };

  const handleInterest = () => {
    triggerHapticFeedback('medium');
    const newInterestedState = !isInterested;
    setIsInterested(newInterestedState);
    setInterestedCount(interestedCount + (newInterestedState ? 1 : -1));
    updatePostInteraction(post.id, 'interested', newInterestedState ? 'increment' : 'decrement');
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col m-4">
      <div className="relative">
        <img src={post.imageUrl} alt={post.title} className="w-full h-48 object-cover" />
        <div className="absolute top-3 left-3 px-3 py-1 text-xs font-bold text-white bg-gradient-to-r from-kl-orange to-kl-red rounded-full shadow-lg">
          {post.category}
        </div>
        {post.isUrgent && (
          <div className="absolute top-3 right-3 px-3 py-1 text-xs font-bold text-red-800 bg-red-200 dark:bg-red-900 dark:text-red-200 rounded-full animate-pulse">
            URGENT
          </div>
        )}
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-1">{post.title}</h3>
        <p className="text-slate-600 dark:text-slate-400 text-sm mb-3 flex-grow">{post.description}</p>

        <div className="flex items-center text-xs text-slate-500 dark:text-slate-400 mb-4 gap-4">
            <div className="flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" /></svg>
                <span>{post.location}</span>
            </div>
            <div className="flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" /></svg>
                <span>{post.postedAt}</span>
            </div>
        </div>
        
        <div className="border-t border-slate-100 dark:border-slate-800 pt-4 mt-auto">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <img src={post.user.avatarUrl} alt={post.user.name} className="w-8 h-8 rounded-full object-cover" />
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-semibold">{post.user.name}</span>
                      {post.user.isVerified && <VerifiedIcon />}
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <button onClick={handleLike} className={`flex items-center gap-1.5 transition-colors rounded-full px-3 py-1 ${isLiked ? 'bg-red-100 dark:bg-red-900/50 text-red-500 dark:text-red-400' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'}`}>
                        <HeartIcon filled={isLiked} className="w-5 h-5" />
                        <span className="text-sm font-medium">{likes}</span>
                    </button>
                    <button onClick={handleInterest} className={`flex items-center gap-1.5 transition-colors rounded-full px-3 py-1 ${isInterested ? 'bg-blue-100 dark:bg-blue-900/50 text-kl-blue' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'}`}>
                        <HandRaisedIcon className="w-5 h-5" />
                        <span className="text-sm font-medium">{interestedCount}</span>
                    </button>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;