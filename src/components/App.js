import {Component} from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Home from './Home';
import Quiz from './Quiz';
import Loader from './Loader';
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
        };
    }
    componentDidMount() {
        fetch('https://opentdb.com/api_category.php')
          .then((res) => res.json())
          .then((data) => {
            this.setState({ data: data.trivia_categories });
          });
      }
    render() {
        let data = this.state.data;
        if (data === null) return <Loader />;
        return (
            <Router>
            <div className="container">
                <Header/>
                <Switch>                    
                    <Route path="/quiz/:category" render={(props) => <Quiz {...props} data={data} />} />
                    <Route path="/">
                        <Home data={data}/>                        
                    </Route>
                </Switch>
                <Footer />
                </div>
            </Router>            
        );
    }
}

export default App;