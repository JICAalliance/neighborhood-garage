import React from "react";
import ToolCard from "../toolCard/toolCard";
import { useQuery } from '@apollo/client';
import { QUERY_TOOL_OWNER } from "../../utils/queries";
import Auth from '../../utils/auth';

const ToolWrapper = ({ tool, checkoutModal }) => {

    const {data} = useQuery(QUERY_TOOL_OWNER, { variables: { id: tool._id } });
    const ownerId = data?.toolOwner._id || [];
    const userId = Auth.getProfile().data._id;

    const userOwned = (ownerId == userId);

    return <div id="toolwrapper">
        <ToolCard tool={tool} checkoutModal={checkoutModal} userOwned={userOwned}>
        </ToolCard>
    </div>
}

export default ToolWrapper;