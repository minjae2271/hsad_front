"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";

type Props = {
    content: string
}

export default function ExpandableCard({content}: Props) {
    const [expanded, setExpanded] = useState(false);
  
    return (
      <div className="relative flex flex-col gap-2 mt-6">
        <div
          className={`transition-all duration-300 ${
            expanded ? "max-h-screen overflow-scroll" : "max-h-24 overflow-hidden"
          }`}
        >
          {content}
        </div>
        {!expanded && content.length > 100 && ( // 텍스트가 길 때만 "See more" 버튼 표시
          <Button
            variant={'outline'}
            onClick={() => setExpanded(true)}
            className="ml-auto text-blue-500 mt-2"
          >
            See more
          </Button>
        )}
        {expanded && (
          <Button
            variant={'outline'}
            onClick={() => setExpanded(false)}
            className="ml-auto text-blue-500 mt-2"
          >
            See less
          </Button>
        )}
      </div>
    );
  };