import { useState, useEffect, useRef } from "react";

export default function App() {
  // Data for the cards
  const response = {
    page: 1,
    results: [
      {
        userId: 1,
        id: 1,
        title: "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
        body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
        image: "https://picsum.photos/500",
      },
      {
        userId: 1,
        id: 2,
        title: "qui est esse",
        body: "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla",
        image: "https://picsum.photos/500",
      },
      {
        userId: 1,
        id: 3,
        title: "ea molestias quasi exercitationem repellat qui ipsa sit aut",
        body: "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut",
        image: "https://picsum.photos/500",
      },
      {
        userId: 1,
        id: 4,
        title: "eum et est occaecati",
        body: "ullam et saepe reiciendis voluptatem adipisci\nsit amet autem assumenda provident rerum culpa\nquis hic commodi nesciunt rem tenetur doloremque ipsam iure\nquis sunt voluptatem rerum illo velit",
        image: "https://picsum.photos/500",
      },
      {
        userId: 1,
        id: 5,
        title: "nesciunt quas odio",
        body: "repudiandae veniam quaerat sunt sed\nalias aut fugiat sit autem sed est\nvoluptatem omnis possimus esse voluptatibus quis\nest aut tenetur dolor neque",
        image: "https://picsum.photos/500",
      },
    ],
  };

  // State for the theme mode
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const homeRef = useRef(null);
  const articlesRef = useRef(null);
  const contactRef = useRef(null);

  // State for the typing speed test
  const [text, setText] = useState("");
  const [targetText, setTargetText] = useState("The quick brown fox jumps over the lazy dog.");
  const [testActive, setTestActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [wpm, setWpm] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [floatingBubbles, setFloatingBubbles] = useState([]);
  
  // Generate random bubbles for background effect
  useEffect(() => {
    const generateBubbles = () => {
      const newBubbles = [];
      for (let i = 0; i < 20; i++) {
        newBubbles.push({
          id: i,
          size: Math.random() * 100 + 20,
          left: Math.random() * 100,
          animationDuration: Math.random() * 20 + 10,
          delay: Math.random() * 5,
          opacity: Math.random() * 0.3 + 0.1
        });
      }
      setFloatingBubbles(newBubbles);
    };
    
    generateBubbles();
  }, []);

  // Timer effect for typing test
  useEffect(() => {
    let timer;
    if (testActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && testActive) {
      setTestActive(false);
      calculateResults();
      setShowResults(true);
    }
    
    return () => clearInterval(timer);
  }, [testActive, timeLeft]);

  // Calculate WPM 
  const calculateResults = () => {
    // Calculate WPM (Words Per Minute)
    const words = text.trim().split(/\s+/).length;
    const elapsedTime = 30 - timeLeft; // Time used in seconds
    const minutes = Math.max(elapsedTime / 60, 0.1); // Ensure at least 0.1 minutes to avoid division by zero
    const calculatedWpm = Math.round(words / minutes);

    setWpm(calculatedWpm);
  };

  // Start typing test
  const startTest = () => {
    setText("");
    setTimeLeft(30);
    setTestActive(true);
    setShowResults(false);
  };

  // Handle typing input
  const handleTextChange = (e) => {
    if (testActive) {
      const newText = e.target.value;
      setText(newText);
      if (newText === targetText) {
        setTestActive(false);
        calculateResults();
        setShowResults(true);
      }
    }
  };

  // Toggle dark/light mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? "bg-gray-900 text-gray-100" : "bg-purple-50 text-gray-800"}`}>
      {/* Floating bubbles background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {floatingBubbles.map(bubble => (
          <div 
            key={bubble.id}
            className={`absolute rounded-full ${darkMode ? "bg-purple-800" : "bg-purple-400"}`}
            style={{
              width: `${bubble.size}px`,
              height: `${bubble.size}px`,
              left: `${bubble.left}%`,
              bottom: "-100px",
              opacity: bubble.opacity,
              animation: `float ${bubble.animationDuration}s ease-in-out ${bubble.delay}s infinite`,
            }}
          />
        ))}
      </div>
      
      {/* Animation keyframes */}
      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0); }
          50% { transform: translateY(-100vh); }
          100% { transform: translateY(-200vh); }
        }
      `}</style>

      {/* Navigation Bar */}
      <nav className={`${darkMode ? "bg-gray-800" : "bg-gradient-to-r from-purple-700 via-purple-800 to-indigo-900"} text-white shadow-lg sticky top-0 z-50`}>
  <div className="container mx-auto px-4">
    <div className="flex justify-between items-center h-16">
      <div className="flex items-center space-x-2">
        <div className={`w-8 h-8 ${darkMode ? "bg-purple-600" : "bg-purple-200"} rounded-full flex items-center justify-center`}>
          <span className={`${darkMode ? "text-white" : "text-purple-800"} font-bold`}>Z</span>
        </div>
        <span className="font-bold text-xl">Zhafira Zahra Alfarisy</span>
      </div>
      
      <div className="hidden md:flex items-center space-x-4">
      <button 
  className={`px-3 py-2 rounded-md transition-all duration-300 ${activeTab === "home" ? (darkMode ? "bg-purple-600" : "bg-purple-600") : (darkMode ? "hover:bg-gray-700" : "hover:bg-purple-700")}`}
  onClick={() => {
    setActiveTab("home");
    homeRef.current?.scrollIntoView({ behavior: 'smooth' });
  }}
>
  Home
</button>

<button 
  className={`px-3 py-2 rounded-md transition-all duration-300 ${activeTab === "articles" ? (darkMode ? "bg-purple-600" : "bg-purple-600") : (darkMode ? "hover:bg-gray-700" : "hover:bg-purple-700")}`}
  onClick={() => {
    setActiveTab("articles");
    articlesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }}
>
  Articles
</button>

<button 
  className={`px-3 py-2 rounded-md transition-all duration-300 ${activeTab === "contact" ? (darkMode ? "bg-purple-600" : "bg-purple-600") : (darkMode ? "hover:bg-gray-700" : "hover:bg-purple-700")}`}
  onClick={() => {
    setActiveTab("contact");
    contactRef.current?.scrollIntoView({ behavior: 'smooth' });
  }}
>
  Contact
</button>
        
        {/* Dark mode toggle */}
        <button 
          onClick={toggleDarkMode}
          className={`p-2 rounded-full ${darkMode ? "bg-gray-700 text-yellow-300" : "bg-purple-600 text-gray-200"} transition-all duration-300`}
          aria-label="Toggle dark mode"
        >
          {darkMode ? (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" fillRule="evenodd" clipRule="evenodd"></path>
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
            </svg>
          )}
        </button>
      </div>
      
      <div className="md:hidden flex items-center space-x-3">
        {/* Mobile dark mode toggle */}
        <button 
    onClick={toggleDarkMode}
    className={`p-2 rounded-full ${darkMode ? "bg-gray-700 text-yellow-300" : "bg-purple-600 text-gray-200"}`}
    aria-label="Toggle dark mode"
  >
    {darkMode ? (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" fillRule="evenodd" clipRule="evenodd"></path>
      </svg>
    ) : (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
      </svg>
    )}
  </button>

         <button 
    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
    className="p-2 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
  >
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path>
    </svg>
  </button>
</div>
    </div>
  </div>
</nav>
{/* Mobile menu dropdown */}
{mobileMenuOpen && (
  <div className="md:hidden absolute top-16 inset-x-0 z-50 transition transform origin-top-right">
    <div className={`${darkMode ? "bg-gray-800" : "bg-purple-900"} shadow-lg rounded-b-lg py-2`}>
      <div className="px-2 pt-2 pb-3 space-y-1">
        <button 
          className={`block w-full text-left px-3 py-2 rounded-md ${activeTab === "home" ? (darkMode ? "bg-purple-600" : "bg-purple-600") : ""} text-white`}
          onClick={() => {
            setActiveTab("home");
            homeRef.current?.scrollIntoView({ behavior: 'smooth' });
            setMobileMenuOpen(false);
          }}
        >
          Home
        </button>
        <button 
          className={`block w-full text-left px-3 py-2 rounded-md ${activeTab === "articles" ? (darkMode ? "bg-purple-600" : "bg-purple-600") : ""} text-white`}
          onClick={() => {
            setActiveTab("articles");
            articlesRef.current?.scrollIntoView({ behavior: 'smooth' });
            setMobileMenuOpen(false);
          }}
        >
          Articles
        </button>
        <button 
          className={`block w-full text-left px-3 py-2 rounded-md ${activeTab === "contact" ? (darkMode ? "bg-purple-600" : "bg-purple-600") : ""} text-white`}
          onClick={() => {
            setActiveTab("contact");
            contactRef.current?.scrollIntoView({ behavior: 'smooth' });
            setMobileMenuOpen(false);
          }}
        >
          Contact
        </button>
      </div>
    </div>
  </div>
)}

     <main ref={homeRef} className="container mx-auto px-4 py-8 relative z-10">
      
  {/* Interactive Feature Showcase heading */}
  <h2 className={`text-2xl font-bold mb-6 ${darkMode ? "text-purple-400" : "text-purple-800"} flex items-center`}>
    <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
    </svg>
    Interactive Feature Showcase
  </h2>
  
        {/* Typing Speed Test */}
        <section className="mb-12">
          <div className={`p-6 rounded-lg shadow-lg ${darkMode ? "bg-gray-800 text-white" : "bg-white"} backdrop-blur-sm bg-opacity-95 max-w-2xl mx-auto transform transition-all duration-300 hover:scale-102`}>
            <h2 className={`text-2xl font-bold mb-6 ${darkMode ? "text-purple-400" : "text-purple-800"} flex items-center`}>
              <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
              </svg>
              Typing Speed Test
            </h2>
            
            <div className="flex flex-col items-center">
              {!testActive && !showResults && (
                <div className="text-center mb-6">
                  <p className={`mb-4 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>Test your typing speed! Click the button below to start.</p>
                  <button 
                    onClick={startTest}
                    className={`px-6 py-3 rounded-full font-bold transition-all ${darkMode ? "bg-purple-600 hover:bg-purple-700 text-white" : "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white"}`}
                  >
                    Start Test
                  </button>
                </div>
              )}
              
              {testActive && (
                <div className="w-full">
                  <div className="flex justify-between mb-2">
                    <div className={`text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                      Time left: <span className="font-bold">{timeLeft}s</span>
                    </div>
                    <button 
                      onClick={() => setTestActive(false)}
                      className={`text-sm ${darkMode ? "text-purple-400 hover:text-purple-300" : "text-purple-600 hover:text-purple-800"}`}
                    >
                      Cancel
                    </button>
                  </div>
                  
                  <div className={`p-4 rounded-md mb-4 font-mono text-sm ${darkMode ? "bg-gray-700 text-gray-200" : "bg-purple-50 text-gray-800"}`}>
                    {targetText.split('').map((char, index) => {
                      let charClass = "";
                      if (index < text.length) {
                        charClass = text[index] === char ? 
                          (darkMode ? "text-green-400" : "text-green-600") : 
                          (darkMode ? "text-red-400" : "text-red-600");
                      }
                      return (
                        <span key={index} className={charClass}>
                          {char}
                        </span>
                      );
                    })}
                  </div>
                  
                  <textarea 
                    value={text}
                    onChange={handleTextChange}
                    className={`w-full p-4 rounded-md ${darkMode ? "bg-gray-700 text-white border-gray-600" : "bg-white border-purple-200"} border-2 focus:outline-none focus:ring-2 focus:ring-purple-500`}
                    rows="3"
                    placeholder="Start typing..."
                    autoFocus
                  />
                </div>
              )}
              
              {showResults && (
  <div className="w-full">
    <div className={`p-6 rounded-lg ${darkMode ? "bg-gray-700" : "bg-purple-100"} mb-4`}>
      <h3 className={`text-xl font-bold mb-4 text-center ${darkMode ? "text-purple-300" : "text-purple-800"}`}>
        Your Results
      </h3>
      
      <div className="text-center">
        <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>Typing Speed</p>
        <p className="text-3xl font-bold">{wpm} <span className="text-sm">WPM</span></p>
      </div>
    </div>
    
    <div className="flex justify-center">
      <button 
        onClick={startTest}
        className={`px-6 py-3 rounded-full font-bold transition-all ${darkMode ? "bg-purple-600 hover:bg-purple-700 text-white" : "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white"}`}
      >
        Try Again
      </button>
    </div>
  </div>
)}
            </div>
          </div>
        </section>

        {/* Card Grid Section */}
        <section ref={articlesRef} className="mb-12">
          <h2 className={`text-2xl font-bold mb-6 ${darkMode ? "text-purple-400" : "text-purple-800"} flex items-center`}>
            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
            </svg>
            Featured Articles
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {response.results.map((item) => (
              <div 
                key={item.id} 
                className={`rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2 ${darkMode ? "bg-gray-800 text-white" : "bg-white"} backdrop-blur-sm bg-opacity-95`}
              >
                <div className="h-48 overflow-hidden relative">
                  <img 
                    src={`${item.image}?random=${item.id}`} 
                    alt={item.title} 
                    className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-110"
                  />
                  <div className={`absolute inset-0 ${darkMode ? "bg-gradient-to-t from-gray-900 to-transparent" : "bg-gradient-to-t from-purple-900/40 to-transparent"} opacity-60`}></div>
                  <div className="absolute bottom-0 left-0 p-4">
                    <span className={`px-2 py-1 text-xs font-bold rounded-full ${darkMode ? "bg-purple-700 text-white" : "bg-purple-100 text-purple-800"}`}>
                      Article #{item.id}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className={`text-lg font-semibold mb-2 line-clamp-1 ${darkMode ? "text-purple-300" : "text-purple-900"}`}>{item.title}</h3>
                  <p className={`text-sm line-clamp-3 mb-4 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>{item.body}</p>
                  <div className="flex justify-between items-center">
                    <button className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${darkMode ? "bg-purple-700 hover:bg-purple-600 text-white" : "bg-purple-100 hover:bg-purple-200 text-purple-800"}`}>
                      Read More
                    </button>
                    <div className="flex space-x-2">
                      <button className={`p-2 rounded-full ${darkMode ? "text-gray-400 hover:text-purple-400" : "text-gray-500 hover:text-purple-600"}`}>
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z"></path>
                        </svg>
                      </button>
                      <button className={`p-2 rounded-full ${darkMode ? "text-gray-400 hover:text-purple-400" : "text-gray-500 hover:text-purple-600"}`}>
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer ref={contactRef} className={`py-8 mt-12 ${darkMode ? "bg-gray-800 text-white" : "bg-gradient-to-r from-purple-800 to-indigo-900 text-white"} relative z-10`}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center space-x-2">
                <div className={`w-8 h-8 ${darkMode ? "bg-purple-600" : "bg-purple-200"} rounded-full flex items-center justify-center`}>
                  <span className={`${darkMode ? "text-white" : "text-purple-800"} font-bold`}>Z</span>
                </div>
                <span className="font-bold text-xl">Advanced Frontend</span>
              </div>
              <p className={`mt-2 text-sm ${darkMode ? "text-gray-400" : "text-purple-200"}`}>Tugas Pendahuluan Sistem Basis Data 9</p>
            </div>
            
            <div className="flex space-x-6">
            <a href="https://github.com/zahraalfarisy" target="_blank" rel="noopener noreferrer" className={`${darkMode ? "text-gray-400 hover:text-white" : "text-purple-200 hover:text-white"} transition-colors duration-300 flex flex-col items-center`}>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
                <span className="text-xs mt-1">GitHub</span>
              </a>
              <a href="mailto:alfarisyzahra@gmail.com" className={`${darkMode ? "text-gray-400 hover:text-white" : "text-purple-200 hover:text-white"} transition-colors duration-300 flex flex-col items-center`}>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 4H4C2.9 4 2.01 4.9 2.01 6L2 18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 8L12 13L4 8V6L12 11L20 6V8Z"></path>
                </svg>
                <span className="text-xs mt-1">Email</span>
              </a>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-gray-700 text-center">
            <p className={`text-sm ${darkMode ? "text-gray-400" : "text-purple-200"}`}>
              &copy; {new Date().getFullYear()} Zhafira Zahra Alfarisy. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}