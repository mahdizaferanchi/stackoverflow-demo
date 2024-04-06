"use client";

import Link from "next/link";
import { useCompletion } from "ai/react";
import parse from "html-react-parser";
import { useState } from "react";
import Markdown from "react-markdown";

export default function Qeustion({ item }) {
  const { completion, complete, isLoading } = useCompletion({
    api: "/api/askai",
  });
  const [detailsOpen, setDetailsOpen] = useState(false);
  const closeText = isLoading ? "Loading" : "Close";
  const buttonText = !detailsOpen ? "Ask AI" : closeText;
  return (
    <div>
      <Link
        key={item.question_id}
        className="inline-block p-2 hover:bg-gray-100 rounded-lg"
        href={item.link}
      >
        {item.title}
      </Link>
      <button
        className="py-1 px-2 my-1 mx-2 border-purple-400 border rounded-lg"
        onClick={() => {
          if (completion == "") {
            complete(item.body);
          }
          setDetailsOpen((cur) => !cur);
        }}
      >
        {buttonText}
      </button>
      <div
        className={`bg-blue-100 p-2 m-2 rounded-lg ${detailsOpen ? "block" : "hidden"}`}
      >
        <div>{parse(item.body)}</div>
        <div className="bg-purple-100 rounded-lg">
          <Markdown className={`prose lg:prose-lg p-2`}>{completion}</Markdown>
        </div>
      </div>
    </div>
  );
}
