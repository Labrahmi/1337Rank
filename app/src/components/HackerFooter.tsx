import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Terminal, MapPin, Users } from 'lucide-react';

const HackerFooter = ({
  campusList = [
    { name: 'Tétouan', enabled: true },
    { name: 'bdl gha URI', enabled: false }
  ],
  staticPromoList = ['2023', '2024', '2025'],
  currentPage = 1,
  prevPage = 0,
  nextPage = 2,
  users = [],
  onPromoChange = (promo: string) => console.log('Promo changed:', promo),
  onPageChange = (page: number) => console.log('Page changed:', page)
}) => {
  const [glitchText, setGlitchText] = useState('');
  const [selectedCampus, setSelectedCampus] = useState('Tétouan');
  const [selectedPromo, setSelectedPromo] = useState('0');

  // Glitch effect for terminal text
  useEffect(() => {
    const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
    const interval = setInterval(() => {
      const randomChar = glitchChars[Math.floor(Math.random() * glitchChars.length)];
      setGlitchText(randomChar);
      setTimeout(() => setGlitchText(''), 100);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handlePromoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedPromo(value);
    if (value !== '0') {
      onPromoChange(value);
      // Simulate navigation
      // window.location.href = `/${selectedCampus}/${value}`;
    }
  };

  const handlePageChange = (page: number) => {
    onPageChange(page);
    // Simulate navigation
    // window.location.href = `?page=${page}`;
  };

  return (
    <div className="fixed bottom-0 left-0 w-full z-50">
      {/* Glitch line effect */}
      <div className="h-px bg-gradient-to-r from-transparent via-green-400 to-transparent opacity-60 animate-pulse"></div>
      
      {/* Main footer */}
      <div className="bg-black bg-opacity-95 backdrop-blur-md border-t border-green-500/20 py-4 px-6">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          
          {/* Left section - Selectors */}
          <div className="flex items-center gap-6">
            {/* Terminal indicator */}
            <div className="flex items-center gap-2 text-green-400">
              <Terminal className="w-4 h-4 animate-pulse" />
              <span className="text-xs font-mono">SYSTEM{glitchText}</span>
            </div>
            
            {/* Campus Selector */}
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg blur opacity-0 group-hover:opacity-30 transition duration-300"></div>
              <div className="relative flex items-center gap-2 bg-gray-900 border border-green-500/30 rounded-lg px-3 py-2 hover:border-green-400/50 transition-all duration-300">
                <MapPin className="w-4 h-4 text-green-400" />
                <select
                  value={selectedCampus}
                  onChange={(e) => setSelectedCampus(e.target.value)}
                  className="bg-transparent text-green-300 text-sm font-mono cursor-pointer outline-none hover:text-green-200 transition-colors duration-200 min-w-[100px] appearance-none"
                >
                  {campusList.map((campus) => (
                    <option 
                      key={campus.name} 
                      value={campus.name}
                      disabled={!campus.enabled}
                      className="bg-gray-900 text-green-300 disabled:text-gray-500"
                    >
                      {campus.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Promo Selector */}
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg blur opacity-0 group-hover:opacity-30 transition duration-300"></div>
              <div className="relative flex items-center gap-2 bg-gray-900 border border-blue-500/30 rounded-lg px-3 py-2 hover:border-blue-400/50 transition-all duration-300">
                <Users className="w-4 h-4 text-blue-400" />
                <select
                  value={selectedPromo}
                  onChange={handlePromoChange}
                  className="bg-transparent text-blue-300 text-sm font-mono cursor-pointer outline-none hover:text-blue-200 transition-colors duration-200 min-w-[80px] appearance-none"
                >
                  <option value="0" className="bg-gray-900 text-blue-300">
                    Promo
                  </option>
                  {staticPromoList.map((promo) => (
                    <option 
                      key={promo} 
                      value={promo}
                      className="bg-gray-900 text-blue-300"
                    >
                      {promo}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Center section - Status */}
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-green-400 text-xs font-mono">ONLINE</span>
          </div>

          {/* Right section - Pagination */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => handlePageChange(prevPage)}
              disabled={prevPage === currentPage}
              className={`group relative p-2 rounded-lg transition-all duration-300 ${
                prevPage === currentPage
                  ? 'text-gray-600 cursor-not-allowed'
                  : 'text-green-400 hover:text-green-300 hover:bg-green-400/10'
              }`}
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-green-400 to-green-600 rounded-lg blur opacity-0 group-hover:opacity-20 transition duration-300"></div>
              <ChevronLeft className="w-5 h-5 relative z-10" />
            </button>

            <div className="flex items-center gap-2">
              <span className="text-gray-400 text-xs font-mono">PAGE</span>
              <div className="bg-gray-900 border border-green-500/30 rounded px-3 py-1 min-w-[40px] text-center">
                <span className="text-green-400 font-mono font-bold">{currentPage}</span>
              </div>
            </div>

            <button
              onClick={() => handlePageChange(nextPage)}
              disabled={users.length === 0}
              className={`group relative p-2 rounded-lg transition-all duration-300 ${
                users.length === 0
                  ? 'text-gray-600 cursor-not-allowed'
                  : 'text-green-400 hover:text-green-300 hover:bg-green-400/10'
              }`}
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-green-400 to-green-600 rounded-lg blur opacity-0 group-hover:opacity-20 transition duration-300"></div>
              <ChevronRight className="w-5 h-5 relative z-10" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Bottom glitch line */}
      <div className="h-px bg-gradient-to-r from-green-400 via-transparent to-green-400 opacity-40"></div>
    </div>
  );
};

export default HackerFooter;