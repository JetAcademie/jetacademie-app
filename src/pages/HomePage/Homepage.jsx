import { useEffect, useState } from 'react';
import InfoSection from './Info-section/InfoSection';
import MissionSection from './Mission-section/MissionSection.jsx';
import MotivationSection from './MotivationSection/MotivationSection.jsx';

const Homepage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 0.1);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    // Skeleton structure
    return (
      <div className="mt-24 bg-gray-100 animate-pulse">
        <div className="container mx-auto px-6 py-10">
          {/* InfoSection Skeleton */}
          <div className="h-48 bg-gray-300 rounded-lg mb-8"></div>

          {/* MotivationSection Skeleton */}
          <div className="h-48 bg-gray-300 rounded-lg mb-8"></div>

          {/* MissionSection Skeleton */}
          <div className="h-48 bg-gray-300 rounded-lg"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-24 bg-gray-100">
      <InfoSection />
      <MotivationSection />
      <MissionSection />
    </div>
  );
};

export default Homepage;
