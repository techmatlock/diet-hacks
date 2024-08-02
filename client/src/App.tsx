import { Header } from './components/Header';
import { useEffect, useState } from 'react';
import './App.css';
import { Home } from './pages/Home';
import { Route, Routes } from 'react-router-dom';
import {
  Category,
  getCategories,
  getPosts,
  getPostsByCategory,
  Posts,
} from './lib/data';

export function App() {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  const [posts, setPosts] = useState<Posts[]>([]);
  const [categoryName, setCategoryName] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isComponentVisible, setIsComponentVisible] = useState(false);
  const [error, setError] = useState<unknown>();

  useEffect(() => {
    async function loadPosts() {
      try {
        if (categoryName) {
          const data = await getPostsByCategory(categoryName);
          setPosts(data);
        } else {
          const data = await getPosts();
          setPosts(data);
        }
      } catch (error) {
        setError(error);
      }
    }
    loadPosts();
  }, [categoryName]);

  useEffect(() => {
    async function loadCategories() {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        setError(error);
      }
    }
    loadCategories();
  }, []);

  useEffect(() => {
    if (window.innerWidth <= 768) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }

    function onResize() {
      if (window.innerWidth <= 768) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    }
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);

  function handleNavClick(name: string | null) {
    setCategoryName(name);
    setIsComponentVisible(false);
  }

  function handleMenuClick() {
    if (!isComponentVisible) {
      setIsComponentVisible(true);
    } else {
      setIsComponentVisible(false);
    }
  }

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Header
              handleMenuClick={handleMenuClick}
              isComponentVisible={isComponentVisible}
              handleNavClick={handleNavClick}
              isMobile={isMobile}
              categories={categories}
            />
          }>
          <Route
            index
            element={
              <Home
                handleNavClick={handleNavClick}
                categories={categories}
                posts={posts}
                isMobile={isMobile}
                error={error}
              />
            }
          />
        </Route>
      </Routes>
    </>
  );
}
