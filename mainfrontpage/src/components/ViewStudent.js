import React,{useState} from 'react';
import axios from 'axios';
import Search from './components/Search';
function ViewStudent() {

    const [state, setState] = useState({
        s: "",
        results: [],
        
      });
    
      const apiurl = `http://learnzilla1.herokuapp.com/classroom/viewstudents/${state.s}`;
      const search = (e) => {
        if (e.key === "Enter") {
          axios(apiurl).then(({ data }) => {
            let results = data;
            console.log(results)
            
            setState(prevState => {
              return { ...prevState, results: results }
            })
          });
        }
      }

      const handleInput = (e) => {
        let s = e.target.value;
    
        setState(prevState => {
          return { ...prevState, s: s }
        });
      }
    

    return (
        <div>
            <Search handleInput={handleInput} search={search} />
        </div>
    )
}

export default ViewStudent
