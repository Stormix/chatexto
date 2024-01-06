'use client';

import { socket } from '@/lib/socket';
import { useGame } from '@/providers/game-provider';
import { ChatMessage } from '@/types/chat';
import { ChatPayload } from '@/types/ws';
import { useEffect, useMemo, useState } from 'react';
import { BsChatLeftFill } from 'react-icons/bs';
import Markdown from 'react-markdown';
import Section from './section';

const Message = ({ message, author }: ChatMessage) => {
  const textColor = useMemo(() => {
    const color = author.color?.replace('#', '') ?? '000000';
    const r = parseInt(color.substring(0, 2), 16);
    const g = parseInt(color.substring(2, 4), 16);
    const b = parseInt(color.substring(4, 6), 16);

    // Counting the perceptive luminance - human eye favors green color...
    const a = 1 - (0.299 * r + 0.587 * g + 0.114 * b) / 255;

    return a < 0.5 ? 'black' : 'white';
  }, [author.color]);

  return (
    <div className="flex flex-col justify-start w-full">
      <div className="flex items-center gap-2">
        <div
          className="px-2 py-[3px] font-semibold rounded text-[10px]"
          style={{ backgroundColor: author.color, color: textColor }}
        >
          {author.name}
        </div>
      </div>
      <div className="font-inter text-[12px] bg-border p-3 uppercase rounded overflow-hidden break-all">
        <Markdown className={'text-wrap w-full'}>{message}</Markdown>
      </div>
    </div>
  );
};

interface ChatProps {
  className?: string;
}

const Chat = ({ className }: ChatProps) => {
  const [chat, setChat] = useState<ChatMessage[]>([]);
  const { connected } = useGame();

  useEffect(() => {
    if (!connected) return;
    socket.on('chat:message', (message: ChatPayload) => {
      // Add a message but limit the amount of messages to 100
      setChat((prev) => [...prev, message.payload].slice(-10) as ChatMessage[]);
    });
  }, [connected]);

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
