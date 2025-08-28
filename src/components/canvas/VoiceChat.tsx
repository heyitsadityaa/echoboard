import { useState } from "react";
import { Mic, MicOff, Users, PhoneOff } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "../ui/button";

interface Participant {
  id: string;
  name: string;
  isMuted: boolean;
  isActive: boolean;
}

export default function VoiceChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [participants, setParticipants] = useState<Participant[]>([
    { id: "1", name: "You", isMuted: false, isActive: true },
    { id: "2", name: "Alex Chen", isMuted: false, isActive: true },
    { id: "3", name: "Sarah Johnson", isMuted: true, isActive: false },
  ]);

  const toggleMute = () => {
    setIsMuted(!isMuted);

    // Update your status in participants
    setParticipants((prev) =>
      prev.map((p) => (p.id === "1" ? { ...p, isMuted: !isMuted } : p)),
    );
  };

  return (
    <div className="absolute top-20 right-6 z-10 select-none">
      <div className="flex flex-col items-end">
        <Button
          variant="secondary"
          className="mb-2 flex items-center gap-2 cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Users size={18} />
          <span>{participants.length}</span>
        </Button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="bg-background border-border shadow-soft w-64 overflow-hidden rounded-lg border"
            >
              <div className="border-border flex items-center justify-between border-b p-3">
                <div className="flex items-center">
                  <Users size={18} className="text-foreground-secondary mr-2" />
                  <h3 className="font-medium">Voice Chat</h3>
                </div>
                <span className="bg-accent/20 text-accent rounded-full px-2 py-0.5 text-xs">
                  Live
                </span>
              </div>

              <div className="max-h-72 overflow-y-auto p-2">
                {participants.map((participant) => (
                  <div
                    key={participant.id}
                    className="hover:bg-background-tertiary flex items-center justify-between rounded-md px-3 py-2"
                  >
                    <div className="flex items-center">
                      <div className="relative">
                        <div
                          className={`bg-background-tertiary flex h-8 w-8 items-center justify-center rounded-full ${participant.isActive ? "border-accent border-2" : ""
                            }`}
                        >
                          {participant.name.charAt(0)}
                        </div>
                        {participant.isMuted && (
                          <div className="bg-background-secondary absolute -right-1 -bottom-1 rounded-full p-0.5">
                            <MicOff
                              size={12}
                              className="text-foreground-tertiary"
                            />
                          </div>
                        )}
                      </div>
                      <span className="ml-2 text-sm">
                        {participant.name}
                        {participant.id === "1" && " (You)"}
                      </span>
                    </div>
                    <div className="bg-accent h-2 w-2 animate-pulse rounded-full"></div>
                  </div>
                ))}
              </div>

              <div className="border-border flex items-center justify-between border-t p-3">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleMute}
                  className={
                    isMuted ? "text-error" : "text-foreground-secondary"
                  }
                >
                  {isMuted ? <MicOff size={20} /> : <Mic size={20} />}
                </Button>
                <Button variant="ghost" size="icon" className="text-error">
                  <PhoneOff size={20} />
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
