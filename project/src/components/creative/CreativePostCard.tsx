import React, { useState } from 'react';
import { Heart, Share2, Eye, MoreVertical, Edit, Trash2 } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import Card from '../common/Card';
import { CreativePost } from '../../types';

interface CreativePostCardProps {
  post: CreativePost;
  onLike?: () => void;
  onShare?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  canEdit?: boolean;
}

const categoryColors: Record<string, string> = {
  art: 'bg-pink-100 text-pink-800',
  writing: 'bg-blue-100 text-blue-800',
  science_models: 'bg-green-100 text-green-800',
  music: 'bg-purple-100 text-purple-800',
  dance: 'bg-yellow-100 text-yellow-800',
  coding: 'bg-indigo-100 text-indigo-800',
  other: 'bg-gray-100 text-gray-800',
};

export default function CreativePostCard({
  post,
  onLike,
  onShare,
  onEdit,
  onDelete,
  canEdit = false,
}: CreativePostCardProps) {
  const [showMenu, setShowMenu] = useState(false);
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
    onLike?.();
  };

  return (
    <Card hover className="relative">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <span className="text-white font-medium text-sm">
              {post.authorId.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">Student Name</p>
            <p className="text-xs text-gray-500">
              {formatDistanceToNow(post.createdAt, { addSuffix: true })}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            categoryColors[post.category] || categoryColors.other
          }`}>
            {post.category.replace('_', ' ').charAt(0).toUpperCase() + 
             post.category.replace('_', ' ').slice(1)}
          </span>
          
          {canEdit && (
            <div className="relative">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="p-1 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100"
              >
                <MoreVertical className="h-4 w-4" />
              </button>
              
              {showMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
                  <button
                    onClick={() => {
                      onEdit?.();
                      setShowMenu(false);
                    }}
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    <Edit className="h-4 w-4 mr-3" />
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      onDelete?.();
                      setShowMenu(false);
                    }}
                    className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4 mr-3" />
                    Delete
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="mb-4">
        <h3 className="text-lg font-medium text-gray-900 mb-2">{post.title}</h3>
        <p className="text-gray-600 text-sm">{post.description}</p>
      </div>

      {/* Images */}
      {post.images && post.images.length > 0 && (
        <div className="mb-4 grid grid-cols-2 gap-2">
          {post.images.slice(0, 4).map((image, index) => (
            <div key={index} className="relative">
              <img
                src={image}
                alt={`${post.title} ${index + 1}`}
                className="w-full h-32 object-cover rounded-lg"
              />
              {index === 3 && post.images && post.images.length > 4 && (
                <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex items-center justify-center">
                  <span className="text-white font-medium">
                    +{post.images.length - 3} more
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
        <div className="flex items-center space-x-4">
          <button
            onClick={handleLike}
            className={`flex items-center space-x-2 text-sm transition-colors duration-200 ${
              liked ? 'text-red-600' : 'text-gray-500 hover:text-red-600'
            }`}
          >
            <Heart className={`h-4 w-4 ${liked ? 'fill-current' : ''}`} />
            <span>{post.likes + (liked ? 1 : 0)}</span>
          </button>
          
          <button
            onClick={onShare}
            className="flex items-center space-x-2 text-sm text-gray-500 hover:text-blue-600 transition-colors duration-200"
          >
            <Share2 className="h-4 w-4" />
            <span>Share</span>
          </button>
        </div>

        <div className="flex items-center text-sm text-gray-500">
          <Eye className="h-4 w-4 mr-1" />
          <span>{post.views} views</span>
        </div>
      </div>
    </Card>
  );
}