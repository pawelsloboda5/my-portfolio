import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { blogPosts } from './blogPosts';
import ReactMarkdown from 'react-markdown';

function BlogPost() {
  const { slug } = useParams();
  const post = blogPosts.find(p => p.slug === slug);

  // Calculate reading time ≈ 200 wpm
  const readingTime = useMemo(() => {
    if (!post) return 0;
    const words = post.content.split(/\s+/).length;
    return Math.max(1, Math.ceil(words / 200));
  }, [post]);

  // Scroll progress state
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const height = document.body.scrollHeight - window.innerHeight;
      const pct = height ? (scrollTop / height) * 100 : 0;
      setProgress(pct);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!post) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Post not found</h1>
        <Link to="/" className="text-indigo-600 hover:underline">Go back home</Link>
      </div>
    </div>
  );

  return (
    <>
      {/* Reading progress bar */}
      <div className="fixed top-0 left-0 h-1 bg-indigo-600 z-50" style={{ width: `${progress}%` }} />

      {/* Hero Header */}
      <header className="pt-24 pb-10 bg-gradient-to-b from-indigo-600 to-indigo-700 text-white shadow-md">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight drop-shadow-lg">
            {post.title}
          </h1>
          <p className="text-sm opacity-80">{post.date} • {readingTime} min read</p>
        </div>
      </header>

      {/* Article */}
      <main className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 py-12 px-4">
        <article className="prose dark:prose-invert max-w-3xl mx-auto">
          <ReactMarkdown>{post.content}</ReactMarkdown>
          <Link to="/" className="text-indigo-600 hover:underline block mt-8">← Back to portfolio</Link>
        </article>
      </main>
    </>
  );
}

export default BlogPost; 