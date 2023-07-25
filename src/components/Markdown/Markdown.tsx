import React from "react";
import ReactMarkdown from "react-markdown";

export const Markdown: React.FC<{ markdown: string, className: string; }> = ({ markdown, className }) => {

    const renderMarkdown = () => {
        const processedMarkdown = markdown.replace(/\n/g, '  \n');
        return (
            <ReactMarkdown className={`
            ${className}
            prose
            prose-p:before:content-none
            prose-p:after:content-none
            prose-code:before:content-none
            prose-code:after:content-none
            prose-code:p-1
            prose-code:rounded-md
            prose-hr:text-white
            prose-lead:text-white
            prose-blockquote:text-white
            prose-headings:text-white
            prose-h1:text-white
            prose-h2:text-white
            prose-h3:text-white
            prose-h4:text-white
            prose-h5:text-white
            prose-h6:text-white
            prose-p:text-white
            prose-a:text-blue-500
            prose-a:hover:text-blue-700
            prose-a:transition-colors
            prose-a:duraton-300
            prose-figure:text-white
            prose-figcaption:text-white
            prose-strong:text-white
            prose-em:text-white
            prose-code:text-white
            prose-pre:text-white
            prose-ol:text-white
            prose-ul:text-white
            prose-li:text-white
            prose-table:text-white
            prose-thead:text-white
            prose-tr:text-white
            prose-th:text-white
            prose-td:text-white
            prose-img:text-white
            prose-video:text-white
            `}>{processedMarkdown}</ReactMarkdown>
        );
    };

    return (
        <>{renderMarkdown()}</>
    )
};