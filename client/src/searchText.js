import React, { useState } from 'react';

function SearchText (props){
    
    const style={
       border:'2px solid black',
       height: '35px'
    }

    return(
        <input id="searchInput" type="text" style={style} placeholder="Search a Ticket..." onChange={(e) => {props.setSearchText(e.target.value)}}/>
    )
}
export default SearchText;