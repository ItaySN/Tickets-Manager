import React, { useState } from 'react';

function SearchText (props){
    

    return(
        <input id="searchInput" type="text" onChange={(e) => {props.setSearchText(e.target.value)}}/>
    )
}
export default SearchText;