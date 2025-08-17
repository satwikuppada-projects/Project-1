import React, { useState } from 'react';
import { Plus, Filter, Search, Palette, Trophy, Star } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import CreativePostCard from '../components/creative/CreativePostCard';
import DashboardCard from '../components/dashboard/DashboardCard';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import { CreativePost, CreativeCategory } from '../types';

const mockPosts: CreativePost[] = [
  {
    id: '1',
    title: 'My Digital Art Creation',
    description: 'Created this landscape painting using digital tools. Inspired by the mountains near our school.',
    category: 'art',
    authorId: 'student-1',
    authorType: 'student',
    content: 'This is my latest artwork...',
    images: [
      'https://images.pexels.com/photos/1183992/pexels-photo-1183992.jpeg?w=400&h=300&fit=crop',
      'https://images.pexels.com/photos/1084687/pexels-photo-1084687.jpeg?w=400&h=300&fit=crop'
    ],
    status: 'published',
    likes: 24,
    views: 156,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
  },
  {
    id: '2',
    title: 'Science Model - Solar System',
    description: 'Built a working model of the solar system with LED lights and motor rotation.',
    category: 'science_models',
    authorId: 'student-2',
    authorType: 'student',
    content: 'This model shows...',
    images: [
      'https://images.pexels.com/photos/87009/pexels-photo-87009.jpeg?w=400&h=300&fit=crop'
    ],
    status: 'published',
    likes: 18,
    views: 98,
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
  },
  {
    id: '3',
    title: 'My First Poetry',
    description: 'A poem about friendship and school memories.',
    category: 'writing',
    authorId: 'student-3',
    authorType: 'student',
    content: 'In the halls of learning...',
    status: 'published',
    likes: 31,
    views: 203,
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
  },
];

const categories: { value: CreativeCategory; label: string }[] = [
  { value: 'art', label: 'Art' },
  { value: 'writing', label: 'Writing' },
  { value: 'science_models', label: 'Science Models' },
  { value: 'music', label: 'Music' },
  { value: 'dance', label: 'Dance' },
  { value: 'coding', label: 'Coding' },
  { value: 'other', label: 'Other' },
];

export default function CreativePage() {
  const { user } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState<CreativeCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);

  const canCreatePost = user?.role === 'student' || user?.role === 'teacher';
  const canModerate = user?.role === 'moderator' || user?.role === 'admin';

  const filteredPosts = mockPosts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const leaderboardData = [
    {
      title: 'Top Creator',
      value: 'Alex K.',
      subtitle: '45 likes this month',
      icon: <Star className="h-6 w-6 text-white" />,
      color: 'bg-yellow-500',
    },
    {
      title: 'Most Liked Post',
      value: '89 likes',
      subtitle: 'Science Fair Project',
      icon: <Trophy className="h-6 w-6 text-white" />,
      color: 'bg-purple-500',
    },
    {
      title: 'Total Posts',
      value: '247',
      subtitle: 'This month',
      icon: <Palette className="h-6 w-6 text-white" />,
      color: 'bg-blue-500',
    },
    {
      title: 'My Posts',
      value: user?.role === 'student' ? '5' : '12',
      subtitle: '23 total likes',
      icon: <Star className="h-6 w-6 text-white" />,
      color: 'bg-green-500',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Creative Corner</h1>
          <p className="mt-1 text-sm text-gray-600">Showcase your creativity and explore others' work</p>
        </div>
        
        {canCreatePost && (
          <Button onClick={() => setShowCreateForm(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Create Post
          </Button>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {leaderboardData.map((stat, index) => (
          <DashboardCard key={index} {...stat} />
        ))}
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value as CreativeCategory | 'all')}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Categories</option>
            {categories.map(category => (
              <option key={category.value} value={category.value}>{category.label}</option>
            ))}
          </select>
          
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>
      </div>

      {/* Leaderboard */}
      <Card>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Monthly Leaderboard</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-gradient-to-b from-yellow-100 to-yellow-50 rounded-lg">
            <div className="h-16 w-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-2">
              <Trophy className="h-8 w-8 text-white" />
            </div>
            <h4 className="font-medium text-gray-900">Alex Kumar</h4>
            <p className="text-sm text-gray-600">Art Category</p>
            <p className="text-xs text-yellow-600">89 likes</p>
          </div>
          
          <div className="text-center p-4 bg-gradient-to-b from-gray-100 to-gray-50 rounded-lg">
            <div className="h-16 w-16 bg-gray-400 rounded-full flex items-center justify-center mx-auto mb-2">
              <Trophy className="h-8 w-8 text-white" />
            </div>
            <h4 className="font-medium text-gray-900">Sarah Johnson</h4>
            <p className="text-sm text-gray-600">Writing Category</p>
            <p className="text-xs text-gray-600">67 likes</p>
          </div>
          
          <div className="text-center p-4 bg-gradient-to-b from-orange-100 to-orange-50 rounded-lg">
            <div className="h-16 w-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-2">
              <Trophy className="h-8 w-8 text-white" />
            </div>
            <h4 className="font-medium text-gray-900">Michael Chen</h4>
            <p className="text-sm text-gray-600">Science Models</p>
            <p className="text-xs text-orange-600">54 likes</p>
          </div>
        </div>
      </Card>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.map(post => (
          <CreativePostCard
            key={post.id}
            post={post}
            canEdit={post.authorId === user?.id || canModerate}
            onLike={() => console.log('Liked post:', post.id)}
            onShare={() => console.log('Shared post:', post.id)}
            onEdit={() => console.log('Edit post:', post.id)}
            onDelete={() => console.log('Delete post:', post.id)}
          />
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <Card className="text-center py-12">
          <Palette className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No posts found</h3>
          <p className="text-gray-500 mb-4">
            {searchQuery || selectedCategory !== 'all' 
              ? 'Try adjusting your search or filters' 
              : 'Be the first to share your creativity!'}
          </p>
          {canCreatePost && (
            <Button onClick={() => setShowCreateForm(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Create First Post
            </Button>
          )}
        </Card>
      )}

      {/* Create Post Modal */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Create New Post</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter post title"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  {categories.map(category => (
                    <option key={category.value} value={category.value}>{category.label}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Describe your creation"
                />
              </div>
              
              <div className="flex justify-end space-x-3 pt-4">
                <Button variant="outline" onClick={() => setShowCreateForm(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setShowCreateForm(false)}>
                  Create Post
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}