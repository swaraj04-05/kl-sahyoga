import { mockPosts, mockUsers } from '../data/mockData';
import { Post, PostType, Category, User } from '../types';
import { db } from '../firebase';
import { collection, getDocs, query, where, orderBy, limit } from "firebase/firestore";

const NETWORK_DELAY = 800;

// Helper to simulate network delay
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// --- API FUNCTIONS ---

/**
 * Fetches posts from Firestore.
 * Can filter by post type, category, and urgency.
 */
export const getPosts = async (
  type: PostType,
  filters: { category?: Category | 'All'; urgent?: boolean; sort?: string } = {}
): Promise<Post[]> => {
  console.log(`Fetching ${type}s from Firestore with filters:`, filters);
  
  const postsCollectionRef = collection(db, "posts");
  let q = query(postsCollectionRef, where("type", "==", type));

  // Apply filters
  if (filters.category && filters.category !== 'All') {
    q = query(q, where("category", "==", filters.category));
  }
  if (filters.urgent) {
    q = query(q, where("isUrgent", "==", true));
  }

  // Apply sorting
  // Note: Firestore requires indexes for compound queries. 
  // You may need to create them in the Firebase console.
  if (filters.sort) {
    if (filters.sort === 'newest') {
      // Assuming you have a 'createdAt' timestamp field in your documents
      // q = query(q, orderBy("createdAt", "desc"));
    } else if (filters.sort === 'most-needed') {
      q = query(q, orderBy("interested", "desc"));
    }
  }

  try {
    const querySnapshot = await getDocs(q);
    const posts = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Post));
    return posts;
  } catch (error) {
    console.error("Error fetching posts from Firestore:", error);
    // Fallback to mock data on error during development
    return mockPosts.filter(p => p.type === type);
  }
};


/**
 * Simulates updating a post's interaction counts (likes, interested).
 */
export const updatePostInteraction = async (
    postId: string,
    interactionType: 'like' | 'interested',
    action: 'increment' | 'decrement'
): Promise<{ success: boolean }> => {
    await sleep(300); // Shorter delay for quick interactions
    console.log(`Updating post ${postId}: ${interactionType} ${action}`);

    const postIndex = mockPosts.findIndex(p => p.id === postId);
    if (postIndex === -1) {
        console.error("Post not found");
        return { success: false };
    }
    
    // This is a simulation. In a real app, you would use Firestore's `updateDoc`
    // and `increment()` to atomically update the count.
    const post = mockPosts[postIndex];
    const change = action === 'increment' ? 1 : -1;
    if (interactionType === 'like') {
        post.likes += change;
    } else {
        post.interested += change;
    }

    return { success: true };
};

/**
 * Simulates getting a new post that wasn't in the initial feed.
 */
export const getNewPost = async (type: PostType): Promise<Post | null> => {
    await sleep(500);
    // Let's create a new post on the fly for the simulation
    const newPost: Post = {
        id: `post${Date.now()}`,
        title: 'Freshly Baked Cookies',
        description: 'I baked too many cookies for my study group. Come grab some before they are all gone!',
        imageUrl: 'https://picsum.photos/seed/cookies/600/400',
        category: Category.FOOD,
        location: 'Student Hub',
        postedAt: '1m ago',
        isUrgent: true,
        user: mockUsers['user2'],
        type: type,
        likes: 0,
        interested: 0,
    };
    console.log("Simulating a new post arrival:", newPost.id);
    // Add to the main mock data so interactions work
    mockPosts.unshift(newPost);
    return newPost;
};
