import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Heart, Eye, ShoppingCart } from 'lucide-react';
import { TextShimmer } from './ui/text-shimmer';

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  description: string;
  features: string[];
  rating: number;
  reviews: number;
  sizes: string[];
  colors: string[];
  category: string;
  badge?: string;
  featured?: boolean;
  images?: string[];
}

interface ModernProductCardProps {
  product: Product;
  viewMode: 'grid' | 'list';
  isWishlisted: boolean;
  wishlistLoading: boolean;
  handleWishlist: (productId: string) => void;
  handleAddToCart: (product: Product) => void;
  handleQuickView: (product: Product) => void;
}

const colorToHex = (color: string) => {
  switch (color.toLowerCase()) {
    case "white": return "#fff";
    case "black": return "#000";
    case "navy": return "#001f3f";
    case "red": return "#ea384c";
    case "blue": return "#0088ff";
    case "green": return "#00ff88";
    case "pink": return "#ff69b4";
    case "purple": return "#8b5cf6";
    case "gray":
    case "charcoal": return "#6b7280";
    case "olive": return "#808000";
    default: return "#ccc";
  }
};

const ModernProductCard = ({
  product, viewMode, isWishlisted, wishlistLoading,
  handleWishlist, handleAddToCart, handleQuickView
}: ModernProductCardProps) => (
  <div
    className={`group relative overflow-hidden bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 ${viewMode === 'list' ? 'flex flex-row' : ''}`}
  >
    <div className={`relative ${viewMode === 'list' ? 'w-48' : 'aspect-[3/4] w-full'} overflow-hidden rounded-t-2xl ${viewMode === 'list' ? 'rounded-l-2xl rounded-tr-none' : ''}`}>
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        loading="lazy"
      />
      
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Wishlist button with modern design */}
      <button
        className="absolute top-3 left-3 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/90 backdrop-blur-sm border border-gray-200/50 shadow-lg transition-all duration-300 hover:scale-110 hover:bg-white hover:shadow-xl focus-visible:ring-2 focus-visible:ring-corex-red active:scale-95"
        aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        onClick={() => handleWishlist(product.id)}
        disabled={wishlistLoading}
      >
        <Heart 
          className={`w-5 h-5 transition-colors duration-200 ${
            isWishlisted ? "text-corex-red fill-corex-red" : "text-gray-400 hover:text-corex-red"
          }`} 
        />
      </button>
      
      {product.badge && (
        <Badge className={`absolute top-3 right-3 ${
          product.badge === 'SALE' ? 'bg-corex-red' : 'bg-corex-blue'
        } text-white px-3 py-1 rounded-full font-semibold shadow-lg`}>
          {product.badge}
        </Badge>
      )}

      {/* Quick action buttons on hover */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
        <div className="flex space-x-2">
          <Button
            size="sm"
            className="bg-white/90 text-gray-800 hover:bg-white hover:text-black backdrop-blur-sm rounded-full px-4 py-2 shadow-lg transform hover:scale-105 transition-all duration-300"
            onClick={() => handleQuickView(product)}
          >
            <Eye className="h-4 w-4 mr-1" />
            Quick View
          </Button>
          <Button
            size="sm"
            className="bg-corex-red/90 text-white hover:bg-corex-red backdrop-blur-sm rounded-full px-4 py-2 shadow-lg transform hover:scale-105 transition-all duration-300"
            onClick={() => handleAddToCart(product)}
          >
            <ShoppingCart className="h-4 w-4 mr-1" />
            Add
          </Button>
        </div>
      </div>
    </div>

    <div className={`p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
      {/* Rating */}
      <div className="flex items-center mb-3">
        {[...Array(5)].map((_, i) => (
          <span key={i} className={`text-sm ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}>★</span>
        ))}
        <span className="text-sm text-gray-500 ml-2">({product.reviews})</span>
      </div>

      {/* Product name with shimmer effect */}
      <TextShimmer
        text={product.name}
        className="text-lg font-semibold mb-3 text-gray-900 group-hover:text-gray-800"
        duration={2000}
      />

      {viewMode === 'list' && (
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{product.description}</p>
      )}

      {/* Price */}
      <div className="flex items-center space-x-2 mb-4">
        <span className="text-xl font-bold text-corex-red">${product.price.toFixed(2)}</span>
        {product.originalPrice && (
          <span className="text-sm text-gray-500 line-through">${product.originalPrice.toFixed(2)}</span>
        )}
      </div>

      {/* Colors */}
      <div className="flex flex-wrap gap-2 mb-4">
        {product.colors && product.colors.slice(0, 4).map((color, idx) => (
          <div
            key={color}
            className="w-5 h-5 rounded-full border-2 border-gray-200 shadow-sm hover:scale-110 transition-transform duration-200"
            style={{ backgroundColor: colorToHex(color) }}
            title={color}
          />
        ))}
        {product.colors && product.colors.length > 4 && (
          <span className="text-xs text-gray-500 self-center">+{product.colors.length - 4}</span>
        )}
      </div>

      {/* Action buttons for non-hover state */}
      <div className="space-y-2 md:opacity-100 group-hover:opacity-0 transition-opacity duration-300">
        <Button
          onClick={() => handleAddToCart(product)}
          className="w-full bg-gradient-to-r from-gray-900 to-black hover:from-corex-red hover:to-corex-blue text-white transition-all duration-500 rounded-xl py-3 font-semibold transform hover:scale-105"
        >
          Add to Cart
        </Button>
        <Button
          variant="outline"
          className="w-full border-gray-300 hover:border-gray-400 rounded-xl py-3 transition-all duration-300"
          onClick={() => handleQuickView(product)}
        >
          <Eye className="h-4 w-4 mr-2" />
          Quick View
        </Button>
      </div>
    </div>
  </div>
);

export default ModernProductCard;