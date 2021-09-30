// import React, { useState, useEffect }  from 'react';
// import CardList from '../components/CardList';
// import SearchBox from "../components/SearchBox";
// import './App.css';
// import Scroll from '../components/Scroll';
// import ErrorBoundary from '../components/ErrorBoundary';


// function App(){

//     const [robots, setRobots] = useState([]);
//     const [searchfield, setSearchField] = useState('');

//     useEffect(()=>{
//             // console.log(this.props.store);
//             fetch('https://jsonplaceholder.typicode.com/users')
//             .then(response=> response.json())
//             .then(users=> {setRobots(users)});
//     }, []);

//     const onSearchChange = (event) => {
//         setSearchField(event.target.value);
//     }

//     const filteredRobots = robots.filter(robot=>{
//             return robot.name.toLowerCase().includes(searchfield.toLowerCase())
//         });

//     return !robots.length ?
//             <h1>Loading...</h1> :
        
//              (
//                 <div className="tc">
//                     <h1 className="f2">Robofriends</h1>
//                     <SearchBox searchChange = {onSearchChange}/>
//                     <Scroll>
//                         <ErrorBoundary>
//                             <CardList robots={filteredRobots}/>
//                         </ErrorBoundary>
//                     </Scroll>
//                 </div>
//     );
//  } 

// export default App;

// ------------------------------------------------------------------------------
/* App.js without React Hooks */

import React from 'react';
import CardList from '../components/CardList';
import SearchBox from "../components/SearchBox";
import './App.css';
import Scroll from '../components/Scroll';
import ErrorBoundary from '../components/ErrorBoundary';
import { setSearchField, requestRobots} from '../actions';
import {connect} from "react-redux";
// import { requestRobots } from '../reducers';


const mapStateToProps = state => {
    return {
        searchField: state.searchRobots.searchField,
        robots: state.requestRobots.robots,
        isPending: state.requestRobots.isPending,
        error: state.requestRobots.error
    }
}

const mapDispatchToProps = (dispatch) => {
   return {
     onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
    onRequestRobots: () => dispatch(requestRobots())
   }
}

class App extends React.Component{

    componentDidMount(){
        this.props.onRequestRobots();
    }

    render(){
        const { searchField, onSearchChange, robots, isPending} =this.props;
        const filteredRobots = robots.filter(robot=>{
            return robot.name.toLowerCase().includes(searchField.toLowerCase())
        });

        return isPending ?
            <h1>Loading...</h1> :

             (
                <div className="tc">
                    <h1 className="f2">Robofriends</h1>
                    <SearchBox searchChange = {onSearchChange}/>
                    <Scroll>
                        <ErrorBoundary>
                            <CardList robots={filteredRobots}/>
                        </ErrorBoundary>
                    </Scroll>
                </div>
            );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App); 