import React from "react";
import ToolCard from "../toolCard/toolCard";
import { useQuery } from '@apollo/client';
import { QUERY_CHECKOUT, QUERY_TOOL_OWNER } from "../../utils/queries";
import Auth from '../../utils/auth';

const ToolWrapper = ({ tool, checkoutModal }) => {
    let checkoutId = null;
    if (tool.checkout){
        checkoutId = tool.checkout._id
    }

    const ownerData = useQuery(QUERY_TOOL_OWNER, { variables: { id: tool._id } });
    const checkoutData = useQuery(QUERY_CHECKOUT, { variables: { id: checkoutId } });

    const ownerId = ownerData.data?.toolOwner._id || [];
    const checkout = checkoutData.data?.checkout || [];
    const userId = Auth.getProfile().data._id;

    const userOwned = (ownerId == userId);

    if (!ownerData.loading && !checkoutData.loading) {
        return <div id="toolwrapper">
            <ToolCard tool={tool} checkout={checkout} checkoutModal={checkoutModal} userOwned={userOwned}>
            </ToolCard>
        </div>
    }
}

export default ToolWrapper;