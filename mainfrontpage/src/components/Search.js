import React from 'react'

function Search({handleInput,search}) {
    return (
        <section className="searchbox-wrap">
            <input 
                type="text"
                className="searchbox" 
                placeholder="Enter class id"
                onChange={handleInput}
                onKeyPress={search}
                >
            </input>
        </section>
    )
}

export default Search