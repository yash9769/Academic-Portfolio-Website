import { Outlet } from 'react-router';
import { Header } from './Header';
import { Footer } from './Footer';
import { BottomActionBar } from './BottomActionBar';
import { ScrollToTop } from './ScrollToTop';

export function Root() {
  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />
      <Header />
      <main className="flex-1 pb-bottom-bar lg:pb-0">
        <Outlet />
      </main>
      <Footer />
      <BottomActionBar />
    </div>
  );
}

