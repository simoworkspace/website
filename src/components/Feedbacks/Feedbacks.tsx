import React, { useEffect, useState } from "react";
import { FeedbackStructure } from "../../types";
import api from "../../utils/api";
import { useParams } from "react-router-dom";
import { FeedbackCard } from "./FeedbackCard";

export const Feedbacks: React.FC = () => {
    const [feedbacks, setFeedbacks] = useState<FeedbackStructure[]>();
    const params = useParams();

    const getBotFeedbacks = async (): Promise<void> => {
        const res = await api.getBotFeedbacks(params.botid as string);
        return setFeedbacks(res.data);
    };

    useEffect(() => { getBotFeedbacks(); }, []);

    return (
        <div className="w-[500px] flex flex-col gap-2">
            {feedbacks?.map(feedback => (<FeedbackCard feedback={feedback}/>))}
        </div>
    )
};