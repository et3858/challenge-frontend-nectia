import React from "react";


function InputElement(props) {
    return (
        <>
            <div className="rounded-xl border-solid border-2 border-gray-200 overflow-hidden">
                <input className="w-full outline-none p-2 bg-transparent" {...props} />
            </div>
        </>
    );
}


export default InputElement;
