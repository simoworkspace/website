import React, { ChangeEvent, useState } from 'react';
import ReactMarkdown from 'react-markdown';

export const Markdown: React.FC = () => {
    const [markdown, setMarkdown] = useState<string>('');

    const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setMarkdown(event.target.value);
    };

    return (
        <div>
            <textarea
                value={markdown}
                onChange={handleInputChange}
                placeholder="Digite aqui!"
            />
            <ReactMarkdown className="m-3 text-white whitespace-break-spaces">{markdown}</ReactMarkdown>
        </div>
    );
};