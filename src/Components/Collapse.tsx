import React from 'react';

interface IProps{
    isOpen : boolean,
    children : JSX.Element

}

function Collapse(props :  IProps){
    
    const [isOpenState, toggle] = React.useState<boolean>(props.isOpen);

    return (
        <>
        <button onClick={()=>{
            isOpenState?toggle(false):toggle(true);
        }}>
            {isOpenState?"close":"open"}
        </button>
        <div>
            {
                isOpenState?
                    props.children:
                    ""
            }
        </div>
        </>
    )

}

export default Collapse;