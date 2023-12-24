import React from "react";
import { UserFlags } from "../../types";
import { FaBug } from "react-icons/fa";
import { FaBook } from "react-icons/fa";
import { FaCode } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { Badge } from "./Badge";

export const Badges: React.FC<{ flags: number }> = ({ flags }) => {
    const hasBadge = (bit: number) => (flags & bit) !== 0;

    return (
        <div className="p-3 flex gap-2 flex-wrap">
            {hasBadge(UserFlags.BugHunter) && <Badge text="Bug Hunter" icon={<FaBug />} type="bug" />}
            {hasBadge(UserFlags.Contributor) && <Badge text="Contributor" icon={<FaBook />} type="contributor" />}
            {hasBadge(UserFlags.PremiumPartner) && <Badge text="Premium Partner" icon={<FaStar />} type="premium" />}
            {hasBadge(UserFlags.Developer) && <Badge text="Developer" icon={<FaCode />} type="dev" />}
        </div>
    );
};
