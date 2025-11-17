import React, { useState } from 'react';
import { 
  HiOutlineMail, 
  HiPlus, 
  HiOutlineSearch, 
  HiOutlinePhone,
  HiOutlineVideoCamera,
  HiOutlineDotsVertical,
  HiOutlinePaperClip,
  HiOutlineEmojiHappy
} from 'react-icons/hi';

const DirectMessagesPage: React.FC = () => {
  const [selectedConversation, setSelectedConversation] = useState<number | null>(1);
  const [newMessage, setNewMessage] = useState('');

  const conversations = [
    {
      id: 1,
      name: 'Olivia Rhye',
      lastMessage: 'Thanks for the update on the project!',
      timestamp: '2 min ago',
      unread: 2,
      avatar: 'OR',
      color: 'from-purple-400 to-pink-500'
    },
    {
      id: 2,
      name: 'Emmanuel Ekpenyong',
      lastMessage: 'Can we schedule a meeting for tomorrow?',
      timestamp: '1 hour ago',
      unread: 0,
      avatar: 'EE',
      color: 'from-blue-400 to-green-500'
    },
    {
      id: 3,
      name: 'Manasseh Udim',
      lastMessage: 'The presentation looks great!',
      timestamp: '3 hours ago',
      unread: 1,
      avatar: 'MU',
      color: 'from-orange-400 to-red-500'
    },
    {
      id: 4,
      name: 'Sarah Wilson',
      lastMessage: 'I\'ll send you the files by EOD',
      timestamp: '1 day ago',
      unread: 0,
      avatar: 'SW',
      color: 'from-green-400 to-teal-500'
    }
  ];

  const messages = [
    {
      id: 1,
      senderId: 1,
      content: 'Hi! How are you doing with the dashboard redesign project?',
      timestamp: '10:30 AM',
      isOwn: false
    },
    {
      id: 2,
      senderId: 'current',
      content: 'I\'m making good progress! Just finished the user research phase.',
      timestamp: '10:32 AM',
      isOwn: true
    },
    {
      id: 3,
      senderId: 1,
      content: 'That\'s great to hear! What insights did you gather from the research?',
      timestamp: '10:35 AM',
      isOwn: false
    },
    {
      id: 4,
      senderId: 'current',
      content: 'Users want more intuitive navigation and better mobile experience. I\'m incorporating those findings into the new design.',
      timestamp: '10:38 AM',
      isOwn: true
    },
    {
      id: 5,
      senderId: 1,
      content: 'Thanks for the update on the project!',
      timestamp: '10:40 AM',
      isOwn: false
    }
  ];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      // Handle sending message
      setNewMessage('');
    }
  };

  const selectedContact = conversations.find(c => c.id === selectedConversation);

  return (
    <div className="max-w-7xl mx-auto h-[calc(100vh-8rem)]">
      <div className="bg-white rounded-lg shadow-brand-md overflow-hidden h-full flex">
        {/* Conversations Sidebar */}
        <div className="w-80 border-r border-gray-200 flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Direct Messages</h2>
              <button className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors">
                <HiPlus className="h-5 w-5" />
              </button>
            </div>
            
            {/* Search */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <HiOutlineSearch className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search conversations..."
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>
          
          {/* Conversations List */}
          <div className="flex-1 overflow-y-auto">
            {conversations.map((conversation) => (
              <div
                key={conversation.id}
                onClick={() => setSelectedConversation(conversation.id)}
                className={`p-4 border-b border-gray-100 cursor-pointer transition-colors ${
                  selectedConversation === conversation.id
                    ? 'bg-primary-50 border-l-4 border-l-primary-500'
                    : 'hover:bg-gray-50'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className={`h-10 w-10 rounded-full bg-gradient-to-br ${conversation.color} flex items-center justify-center text-white font-medium text-sm`}>
                    {conversation.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium text-gray-900 truncate">
                        {conversation.name}
                      </h3>
                      <span className="text-xs text-gray-500">
                        {conversation.timestamp}
                      </span>
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-sm text-gray-600 truncate">
                        {conversation.lastMessage}
                      </p>
                      {conversation.unread > 0 && (
                        <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-primary-500 text-white text-xs font-medium">
                          {conversation.unread}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {selectedContact ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`h-10 w-10 rounded-full bg-gradient-to-br ${selectedContact.color} flex items-center justify-center text-white font-medium text-sm`}>
                      {selectedContact.avatar}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {selectedContact.name}
                      </h3>
                      <p className="text-sm text-gray-500">Online</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors">
                      <HiOutlinePhone className="h-5 w-5" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors">
                      <HiOutlineVideoCamera className="h-5 w-5" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors">
                      <HiOutlineDotsVertical className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.isOwn
                          ? 'bg-primary-500 text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p
                        className={`text-xs mt-1 ${
                          message.isOwn ? 'text-primary-100' : 'text-gray-500'
                        }`}
                      >
                        {message.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-gray-200">
                <form onSubmit={handleSendMessage}>
                  <div className="flex items-end space-x-2">
                    <button
                      type="button"
                      className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <HiOutlinePaperClip className="h-5 w-5" />
                    </button>
                    <div className="flex-1">
                      <textarea
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type a message..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        rows={2}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleSendMessage(e);
                          }
                        }}
                      />
                    </div>
                    <button
                      type="button"
                      className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <HiOutlineEmojiHappy className="h-5 w-5" />
                    </button>
                    <button
                      type="submit"
                      disabled={!newMessage.trim()}
                      className="px-4 py-2 bg-primary-500 text-white font-medium rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      Send
                    </button>
                  </div>
                </form>
              </div>
            </>
          ) : (
            /* Empty State */
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <HiOutlineMail className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-4 text-lg font-medium text-gray-900">
                  Select a conversation
                </h3>
                <p className="mt-2 text-sm text-gray-600">
                  Choose from your existing conversations or start a new one
                </p>
                <div className="mt-6">
                  <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-500 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors">
                    <HiPlus className="mr-2 h-4 w-4" />
                    Start Conversation
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DirectMessagesPage;