import React, { useState } from 'react';
import { Search, RefreshCw, Check, X, User, MessageCircle, Send, ArrowLeft } from 'lucide-react';

const BarterMatchSystem = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    offering: '',
    seeking: ''
  });
  const [searchOffering, setSearchOffering] = useState('');
  const [searchSeeking, setSearchSeeking] = useState('');
  const [matches, setMatches] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [activeChats, setActiveChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messageInput, setMessageInput] = useState('');

  // Sample user database
  const existingUsers = [
    { id: 1, name: 'Sarah M.', has: 'Guitar Lessons', wants: 'Web Design', location: 'Downtown', rating: 4.8 },
    { id: 2, name: 'Mike R.', has: 'Web Design', wants: 'Lawn Care', location: 'Westside', rating: 4.9 },
    { id: 3, name: 'Emily K.', has: 'Lawn Care', wants: 'Guitar Lessons', location: 'Downtown', rating: 4.7 },
    { id: 4, name: 'James T.', has: 'Photography', wants: 'Plumbing Services', location: 'Eastside', rating: 4.6 },
    { id: 5, name: 'Lisa P.', has: 'Plumbing Services', wants: 'Photography', location: 'Northside', rating: 5.0 },
    { id: 6, name: 'David W.', has: 'Carpentry', wants: 'Painting', location: 'Southside', rating: 4.8 },
    { id: 7, name: 'Anna L.', has: 'Painting', wants: 'Carpentry', location: 'Downtown', rating: 4.5 },
    { id: 8, name: 'Tom H.', has: 'Bicycle Repair', wants: 'Cooking Lessons', location: 'Westside', rating: 4.7 },
  ];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const createUser = (e) => {
    if (e) e.preventDefault();
    
    const newUser = {
      id: Date.now(),
      name: formData.name,
      has: formData.offering,
      wants: formData.seeking,
      location: formData.location,
      rating: 5.0
    };
    setCurrentUser(newUser);
    setSearchOffering(formData.offering);
    setSearchSeeking(formData.seeking);
  };

  const findMatches = () => {
    if (!searchOffering || !searchSeeking) return;

    const directMatches = existingUsers.filter(
      user => user.has.toLowerCase().includes(searchSeeking.toLowerCase()) &&
              user.wants.toLowerCase().includes(searchOffering.toLowerCase())
    );

    const partialMatches = existingUsers.filter(
      user => (user.has.toLowerCase().includes(searchSeeking.toLowerCase()) ||
               user.wants.toLowerCase().includes(searchOffering.toLowerCase())) &&
              !directMatches.includes(user)
    );

    setMatches([
      ...directMatches.map(m => ({ ...m, matchType: 'perfect' })),
      ...partialMatches.map(m => ({ ...m, matchType: 'partial' }))
    ]);
    setHasSearched(true);
  };

  const updateSearch = () => {
    setSearchOffering(currentUser.has);
    setSearchSeeking(currentUser.wants);
    setMatches([]);
    setHasSearched(false);
  };

  const logout = () => {
    setCurrentUser(null);
    setFormData({ name: '', location: '', offering: '', seeking: '' });
    setSearchOffering('');
    setSearchSeeking('');
    setMatches([]);
    setHasSearched(false);
    setActiveChats([]);
    setCurrentChat(null);
  };

  const acceptTrade = (user) => {
    const existingChat = activeChats.find(chat => chat.partner.id === user.id);
    
    if (!existingChat) {
      const newChat = {
        id: Date.now(),
        partner: user,
        messages: [
          {
            id: 1,
            sender: 'system',
            text: `Trade accepted! You can now coordinate with ${user.name} to arrange the exchange.`,
            timestamp: new Date()
          }
        ],
        accepted: true
      };
      setActiveChats([...activeChats, newChat]);
      setCurrentChat(newChat);
    } else {
      setCurrentChat(existingChat);
    }
  };

  const sendMessage = () => {
    if (!messageInput.trim() || !currentChat) return;

    const newMessage = {
      id: Date.now(),
      sender: 'user',
      text: messageInput,
      timestamp: new Date()
    };

    const updatedChats = activeChats.map(chat => {
      if (chat.id === currentChat.id) {
        return {
          ...chat,
          messages: [...chat.messages, newMessage]
        };
      }
      return chat;
    });

    setActiveChats(updatedChats);
    setCurrentChat({
      ...currentChat,
      messages: [...currentChat.messages, newMessage]
    });
    setMessageInput('');

    // Simulate a response from the other user
    setTimeout(() => {
      const responseMessage = {
        id: Date.now() + 1,
        sender: 'partner',
        text: getAutoResponse(),
        timestamp: new Date()
      };

      const updatedChatsWithResponse = activeChats.map(chat => {
        if (chat.id === currentChat.id) {
          return {
            ...chat,
            messages: [...chat.messages, newMessage, responseMessage]
          };
        }
        return chat;
      });

      setActiveChats(updatedChatsWithResponse);
      setCurrentChat(prev => ({
        ...prev,
        messages: [...prev.messages, responseMessage]
      }));
    }, 1500);
  };

  const getAutoResponse = () => {
    const responses = [
      "Sounds great! When would work for you?",
      "Perfect! I'm available this weekend.",
      "That works for me. Should we meet at a public place?",
      "I'm excited about this trade! Let me know what time is best.",
      "Great! I'll bring everything we discussed."
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const backToMatches = () => {
    setCurrentChat(null);
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  };

  // Registration Form
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
          <div className="text-center mb-6">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="text-blue-600" size={32} />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome to Barter Match</h1>
            <p className="text-gray-600">Create your profile to start finding trade partners</p>
          </div>

          <form onSubmit={createUser} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="e.g., John Smith"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location *
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="e.g., Downtown, Westside"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                What can you offer? *
              </label>
              <input
                type="text"
                name="offering"
                value={formData.offering}
                onChange={handleInputChange}
                placeholder="e.g., Guitar Lessons, Web Design"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                What are you seeking? *
              </label>
              <input
                type="text"
                name="seeking"
                value={formData.seeking}
                onChange={handleInputChange}
                placeholder="e.g., Plumbing Services, Photography"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition"
            >
              Create Profile & Find Matches
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Chat View
  if (currentChat) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg h-[600px] flex flex-col">
            {/* Chat Header */}
            <div className="bg-blue-600 text-white p-4 rounded-t-lg flex items-center gap-3">
              <button
                onClick={backToMatches}
                className="hover:bg-blue-700 p-2 rounded-lg transition"
              >
                <ArrowLeft size={20} />
              </button>
              <div className="flex-1">
                <h2 className="text-lg font-semibold">{currentChat.partner.name}</h2>
                <p className="text-sm text-blue-100">
                  Trading: {currentChat.partner.has} ↔ {currentChat.partner.wants}
                </p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {currentChat.messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs px-4 py-2 rounded-lg ${
                      message.sender === 'user'
                        ? 'bg-blue-600 text-white'
                        : message.sender === 'system'
                        ? 'bg-green-100 text-green-800 text-sm italic'
                        : 'bg-gray-200 text-gray-800'
                    }`}
                  >
                    {message.sender === 'partner' && (
                      <p className="text-xs font-semibold mb-1">{currentChat.partner.name}</p>
                    )}
                    <p>{message.text}</p>
                    <p className="text-xs mt-1 opacity-70">{formatTime(message.timestamp)}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="border-t p-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  onClick={sendMessage}
                  disabled={!messageInput.trim()}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Main Dashboard (after user creation)
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-4xl mx-auto">
        {/* User Profile Card */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{currentUser.name}</h2>
              <p className="text-gray-600 text-sm mt-1">
                <span className="font-medium">Location:</span> {currentUser.location}
              </p>
              <div className="mt-3 space-y-1 text-sm">
                <p className="text-gray-700">
                  <span className="font-medium">Offering:</span> {currentUser.has}
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">Seeking:</span> {currentUser.wants}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              {activeChats.length > 0 && (
                <div className="relative">
                  <button className="bg-green-100 text-green-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-200 transition flex items-center gap-2">
                    <MessageCircle size={18} />
                    Active Chats
                    <span className="bg-green-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {activeChats.length}
                    </span>
                  </button>
                </div>
              )}
              <button
                onClick={logout}
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-300 transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Active Chats List */}
        {activeChats.length > 0 && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Your Active Trades</h3>
            <div className="space-y-3">
              {activeChats.map((chat) => (
                <div
                  key={chat.id}
                  className="border-2 border-green-200 bg-green-50 rounded-lg p-4 flex items-center justify-between"
                >
                  <div>
                    <h4 className="font-semibold text-gray-800">{chat.partner.name}</h4>
                    <p className="text-sm text-gray-600">
                      {chat.messages.length} message{chat.messages.length !== 1 ? 's' : ''}
                    </p>
                  </div>
                  <button
                    onClick={() => setCurrentChat(chat)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition flex items-center gap-2"
                  >
                    <MessageCircle size={18} />
                    Open Chat
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Search Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Find Your Matches</h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                I'm offering
              </label>
              <input
                type="text"
                value={searchOffering}
                onChange={(e) => setSearchOffering(e.target.value)}
                placeholder="What do you have to offer?"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                I'm seeking
              </label>
              <input
                type="text"
                value={searchSeeking}
                onChange={(e) => setSearchSeeking(e.target.value)}
                placeholder="What are you looking for?"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={findMatches}
                disabled={!searchOffering || !searchSeeking}
                className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition"
              >
                <Search size={20} />
                Find Matches
              </button>
              <button
                onClick={updateSearch}
                className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-300 flex items-center gap-2 transition"
              >
                <RefreshCw size={20} />
                Reset
              </button>
            </div>
          </div>
        </div>

        {/* Results Section */}
        {hasSearched && (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {matches.length > 0 ? 'Your Matches' : 'No Matches Found'}
            </h2>
            
            {matches.length === 0 ? (
              <div className="text-center py-12">
                <X className="mx-auto text-gray-400 mb-4" size={48} />
                <p className="text-gray-600">
                  No matches found. Try adjusting your search terms or check back later!
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {matches.map((match) => {
                  const hasActiveChat = activeChats.some(chat => chat.partner.id === match.id);
                  
                  return (
                    <div
                      key={match.id}
                      className={`border-2 rounded-lg p-5 transition hover:shadow-md ${
                        match.matchType === 'perfect'
                          ? 'border-green-300 bg-green-50'
                          : 'border-blue-200 bg-blue-50'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold text-gray-800">
                              {match.name}
                            </h3>
                            {match.matchType === 'perfect' && (
                              <span className="bg-green-500 text-white text-xs px-3 py-1 rounded-full flex items-center gap-1">
                                <Check size={14} />
                                Perfect Match
                              </span>
                            )}
                            {hasActiveChat && (
                              <span className="bg-blue-500 text-white text-xs px-3 py-1 rounded-full">
                                Trade Active
                              </span>
                            )}
                          </div>
                          
                          <div className="space-y-1 text-sm text-gray-600 mb-3">
                            <p>
                              <span className="font-medium">Offers:</span> {match.has}
                            </p>
                            <p>
                              <span className="font-medium">Wants:</span> {match.wants}
                            </p>
                            <p>
                              <span className="font-medium">Location:</span> {match.location}
                            </p>
                          </div>

                          <div className="flex items-center gap-2">
                            <div className="flex text-yellow-500">
                              {'★'.repeat(Math.floor(match.rating))}
                            </div>
                            <span className="text-sm text-gray-600">{match.rating}</span>
                          </div>
                        </div>

                        <button
                          onClick={() => acceptTrade(match)}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition flex items-center gap-2 ${
                            hasActiveChat
                              ? 'bg-green-600 text-white hover:bg-green-700'
                              : 'bg-blue-600 text-white hover:bg-blue-700'
                          }`}
                        >
                          {hasActiveChat ? (
                            <>
                              <MessageCircle size={18} />
                              Message
                            </>
                          ) : (
                            'Accept Trade'
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BarterMatchSystem;