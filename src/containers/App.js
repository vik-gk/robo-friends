import { Component } from "react";
// import { robots } from "./robots";
import CardList from "../components/CardList";
import SearchBox from "../components/SearchBox";
import Scroll from "../components/Scroll";
import './App.css'

class App extends Component{
    constructor(){
        super();
        this.state = {
            robots: [],
            searchField: ""
        }
    }
    componentDidMount(){
        fetch("https://jsonplaceholder.typicode.com/users")
            .then(response => response.json())
            .then(users => this.setState({robots: users}));
            // .then(users => {});
    }
    onSearchChange = (event) =>{
        // console.log(event.target.value);
        this.setState({searchField: event.target.value});
        //moved below code to render()
        // const filteredRobots = this.state.robots.filter(robots =>{
        //     return robots.name.toLowerCase().includes(this.state.searchField.toLowerCase());
        // });
        // console.log(filteredRobots);
    }
    render(){
        const { robots, searchField} = this.state;
        const filteredRobots = robots.filter(robot =>{
            return robot.name.toLowerCase().includes(searchField.toLowerCase());
        });
        if (!robots.length){
            return <h1>Loading...</h1>
        }else{
            return(
                <div className="tc">
                    <h1>RoboFriends</h1>
                    <SearchBox searchChange={this.onSearchChange}/>
                    {/* <CardList robots = {this.state.robots}/> */}
                    <Scroll>
                        <CardList robots = {filteredRobots}/>
                    </Scroll>
                </div>
            );
        }
    }
}

export default App;