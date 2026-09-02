'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { INITIAL_CONVERSATIONS } from '@/data/messages';
import { Conversation, Message } from '@/lib/types';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/common/Button';
import {
  Send,
  Paperclip,
  Smile,
  ChevronLeft,
  Search,
  CheckCheck,
  Sparkles,
} from 'lucide-react';

export default function MessagesPage() {
  const { user } = useAuth();
  const [conversations, setConversations] = useState<Conversation[]>(INITIAL_CONVERSATIONS);
  const [selectedConvId, setSelectedConvId] = useState<string>(INITIAL_CONVERSATIONS[0].id);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const activeConv = conversations.find((c) => c.id === selectedConvId) || conversations[0];

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim()) return;

    const newMsg: Message = {
      id: `msg-${Date.now()}`,
      senderId: user?.id || 'usr-101',
      senderName: user?.name || 'Aarav Sharma',
      senderAvatar: user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
      text: inputText.trim(),
      timestamp: 'Just now',
      isHost: false,
    };

    const updatedConvs = conversations.map((conv) => {
      if (conv.id === activeConv.id) {
        return {
          ...conv,
          lastMessage: inputText.trim(),
          lastMessageTime: 'Just now',
          messages: [...conv.messages, newMsg],
        };
      }
      return conv;
    });

    setConversations(updatedConvs);
    setInputText('');

    // Simulate Host Auto-Reply after 1.5s
    setIsTyping(true);
    setTimeout(() => {
      const hostReply: Message = {
        id: `msg-reply-${Date.now()}`,
        senderId: activeConv.host.id,
        senderName: activeConv.host.name,
        senderAvatar: activeConv.host.avatar,
        text: 'Thanks for reaching out! We’re making sure everything is perfect for your arrival.',
        timestamp: 'Just now',
        isHost: true,
      };

      setConversations((prev) =>
        prev.map((c) =>
          c.id === activeConv.id
            ? { ...c, lastMessage: hostReply.text, messages: [...c.messages, hostReply] }
            : c
        )
      );
      setIsTyping(false);
    }, 1600);
  };

  const filteredConvs = conversations.filter((c) =>
    c.host.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.propertyTitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6 pb-20 md:pb-6">
      <div className="rounded-3xl border border-gray-200 bg-white shadow-xs overflow-hidden h-[calc(100vh-140px)] sm:h-[calc(100vh-160px)] min-h-[500px] flex">
        {/* Left Column: Conversations List */}
        <div
          className={`w-full md:w-80 lg:w-96 border-r border-gray-200 flex flex-col ${
            selectedConvId ? 'hidden md:flex' : 'flex'
          }`}
        >
          {/* Header */}
          <div className="p-3.5 sm:p-4 border-b border-gray-100 space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-[#222222]">Messages</h2>
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-gray-400" />
              <input
                type="text"
                placeholder="Search conversations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-xl border border-gray-200 py-1.5 sm:py-2 pl-8 pr-3 text-xs bg-gray-50 focus:bg-white focus:border-black focus:outline-hidden"
              />
            </div>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto custom-scrollbar divide-y divide-gray-100">
            {filteredConvs.map((conv) => {
              const isSelected = conv.id === activeConv.id;
              return (
                <button
                  key={conv.id}
                  type="button"
                  onClick={() => setSelectedConvId(conv.id)}
                  className={`flex items-center gap-3 w-full p-3 sm:p-4 text-left transition-colors cursor-pointer ${
                    isSelected ? 'bg-gray-100/80' : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="relative h-11 w-11 sm:h-12 sm:w-12 rounded-full overflow-hidden shrink-0 bg-gray-100">
                    <Image
                      src={conv.host.avatar}
                      alt={conv.host.name}
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-baseline mb-0.5">
                      <span className="font-bold text-xs sm:text-sm text-[#222222] truncate">
                        {conv.host.name}
                      </span>
                      <span className="text-[10px] text-gray-400 shrink-0">
                        {conv.lastMessageTime}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 truncate">{conv.lastMessage}</p>
                    <p className="text-[10px] text-[#FF385C] truncate font-semibold mt-0.5">
                      {conv.propertyTitle}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Active Chat Window */}
        <div
          className={`flex-1 flex flex-col bg-gray-50/50 ${
            !selectedConvId ? 'hidden md:flex' : 'flex'
          }`}
        >
          {/* Chat Header */}
          <div className="p-3 sm:p-4 bg-white border-b border-gray-200 flex items-center justify-between">
            <div className="flex items-center gap-2.5 sm:gap-3">
              <button
                type="button"
                onClick={() => setSelectedConvId('')}
                className="md:hidden p-1.5 rounded-full hover:bg-gray-100 text-gray-700"
                aria-label="Back to messages list"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              <div className="relative h-9 w-9 sm:h-10 sm:w-10 rounded-full overflow-hidden shrink-0 bg-gray-100">
                <Image
                  src={activeConv.host.avatar}
                  alt={activeConv.host.name}
                  fill
                  sizes="40px"
                  className="object-cover"
                />
              </div>

              <div className="min-w-0">
                <h3 className="font-bold text-xs sm:text-sm text-[#222222] truncate">{activeConv.host.name}</h3>
                <p className="text-[11px] text-gray-500 truncate">
                  {activeConv.host.isSuperhost ? 'Superhost · Replies within an hour' : 'Host'}
                </p>
              </div>
            </div>

            <div className="relative h-9 w-12 sm:h-10 sm:w-14 rounded-xl overflow-hidden shrink-0 hidden sm:block">
              <Image
                src={activeConv.propertyImage}
                alt={activeConv.propertyTitle}
                fill
                sizes="56px"
                className="object-cover"
              />
            </div>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 overflow-y-auto p-3 sm:p-6 space-y-3 sm:space-y-4 custom-scrollbar">
            {activeConv.messages.map((msg) => {
              const isMe = !msg.isHost;
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[85%] sm:max-w-[70%] rounded-2xl p-3 sm:p-3.5 text-xs sm:text-sm shadow-2xs ${
                      isMe
                        ? 'bg-[#222222] text-white rounded-br-xs'
                        : 'bg-white text-[#222222] border border-gray-200 rounded-bl-xs'
                    }`}
                  >
                    <p className="leading-relaxed">{msg.text}</p>
                  </div>
                  <span className="text-[10px] text-gray-400 mt-1 px-1">{msg.timestamp}</span>
                </div>
              );
            })}

            {isTyping && (
              <div className="flex items-center gap-1.5 text-xs text-gray-500 italic p-1.5">
                <Sparkles className="h-3 w-3 animate-spin text-[#FF385C]" />
                <span>{activeConv.host.name} is typing...</span>
              </div>
            )}
          </div>

          {/* Message Input Bar */}
          <form
            onSubmit={handleSendMessage}
            className="p-2.5 sm:p-4 bg-white border-t border-gray-200 flex items-center gap-2"
          >
            <button
              type="button"
              className="p-2 text-gray-400 hover:text-black hover:bg-gray-100 rounded-full transition-colors shrink-0"
              aria-label="Attach photo"
            >
              <Paperclip className="h-4 w-4" />
            </button>

            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type message to host..."
              className="flex-1 rounded-xl border border-gray-300 py-2 px-3 text-xs sm:text-sm focus:border-black focus:outline-hidden"
            />

            <Button
              type="submit"
              variant="primary"
              size="sm"
              disabled={!inputText.trim()}
              className="rounded-xl px-3.5 py-2 shrink-0"
            >
              <Send className="h-3.5 w-3.5" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
