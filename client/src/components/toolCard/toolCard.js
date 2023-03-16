import React from "react";
import { Card, Icon } from 'semantic-ui-react';

const ToolCard = ({tools}) =>{

    return <div id='tool-container'>
    {/* map through tool and display via card */}
    {tools.map(({_id, name, description, image, checkout},index)=>(

        <Card 

        key={_id}
        id={_id}
        // image={image? image: 'No image to display'}
        header={name}
        description={description}
        extra={checkout? 'Status: Borrowed':'Status: Available'}
        
      />
    )
    )}

  </div>

};


export default ToolCard;
