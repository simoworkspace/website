import React, { ChangeEvent, useState } from 'react';
import ReactMarkdown from 'react-markdown';

export const Markdown: React.FC = () => {
    const [markdown, setMarkdown] = useState<string>('');

    const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setMarkdown(event.target.value);
    };

    const renderMarkdown = () => {
        const processedMarkdown = markdown.replace(/\n/g, '  \n');
        return (
            <ReactMarkdown
                className="m-3 text-white"
                transformLinkUri={null}
            >
                {processedMarkdown}
            </ReactMarkdown>
        );
    };

    return (
        <>
            <textarea
                value={markdown}
                onChange={handleInputChange}
                placeholder="Digite aqui!"
            />
            {renderMarkdown()}
        </>
    );
};
