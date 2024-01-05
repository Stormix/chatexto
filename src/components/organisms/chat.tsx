'use client';

import { ChatMessage } from '@/types/chat';
import { useState } from 'react';
import { BsChatLeftFill } from 'react-icons/bs';
import Section from './section';

const dummyMessages = [
  {
    message: 'Hello world!',
    author: {
      name: 'John Doe',
      color: '#2A824D',
    },
  },
  {
    message: 'Hello world!',
    author: {
      name: 'John Doe',
      color: '#2A824D',
    },
  },
  {
    message: 'Hello world!',
    author: {
      name: 'John Doe',
      color: '#2A824D',
    },
  },
  {
    message: 'Hello world!',
    author: {
      name: 'John Doe',
      color: '#2A824D',
    },
  },
  {
    message: 'Hello world!',
    author: {
      name: 'John Doe',
      color: '#2A824D',
    },
  },
];

const Message = ({ message, author }: ChatMessage) => {
  return (
    <div className="flex flex-col justify-start w-full">
      <div className="flex items-center gap-2">
        <div className="px-2 py-[3px] font-semibold rounded text-[10px]" style={{ backgroundColor: author.color }}>
          {author.name}
        </div>
      </div>
      <div className="font-inter text-[12px] bg-border p-3 uppercase rounded">{message}</div>
    </div>
  );
};

interface ChatProps {
  className?: string;
}

const Chat = ({ className }: ChatProps) => {
  const [chat, setChat] = useState<ChatMessage[]>(dummyMessages);

  return (
    <Section
      className={className}
      title={
        <>
          <BsChatLeftFill className="w-6 h-6" />
          Chat
        </>
      }
    >
      <div className="flex flex-col items-start justify-end h-full gap-4 p-4">
        {chat.map((message, index) => (
          <Message key={index} {...message} />
        ))}
      </div>
    </Section>
  );
};

export default Chat;
