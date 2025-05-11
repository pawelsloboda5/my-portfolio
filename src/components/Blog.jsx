import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { blogPosts } from './blogPosts';

const posts = blogPosts.map(p => ({
  title: p.title,
  date: p.date,
  excerpt: p.content.split('\n')[2] || '',
  slug: p.slug,
  readTime: Math.max(1, Math.ceil(p.content.split(/\s+/).length / 200))
}));

function Blog() {
  return (
    <section id="blog" className="py-16 bg-gray-100 dark:bg-gray-800 min-h-[50vh]">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-6 text-center">Blog</h2>
        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {posts.map((post, idx) => (
            <motion.article
              key={idx}
              whileHover={{ y: -4 }}
              className="relative p-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg hover:shadow-2xl transition-shadow border border-gray-200 dark:border-gray-700 group overflow-hidden"
            >
              <span className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              <h3 className="text-xl font-semibold mb-1">{post.title}</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">{post.date} • {post.readTime} min read</p>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-4 line-clamp-3">{post.excerpt}</p>
              <Link to={`/blog/${post.slug}`} className="inline-block mt-auto text-indigo-400 dark:text-indigo-300 group-hover:text-indigo-200 font-medium transition-colors">Read more →</Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Blog; 