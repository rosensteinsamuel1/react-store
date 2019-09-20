import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

//Components
import Product from '../product/product.js'
import WishList from '../wishlist/wishlist.js'

// Services
import HttpService from '../services/http-service';

const http = new HttpService();

class App extends Component {
    
    constructor(props) {
        super(props);
        this.state = {products:[]};
        
        // Bind functions
        this.loadData = this.loadData.bind(this);
        this.productList = this.productList.bind(this);
        
        this.loadData();
        
    }
    
    loadData = () => {
        
        // need to save variable for this because we want to refresh the Component while in a promise 'this' would be the promise, not the Component
        var self = this; // 
        http.getProducts().then(data => {
            // Every time setState() is called, the entire Component is reloaded. If you 
            // want something to refresh, call setState() at the highest level you want
            // to be refreshed
            self.setState({products:data})
            //console.log(products);
        }, err => { // called if promise is rejected
            
        });
    }
    
    productList = () => {
        const list = this.state.products.map( (product) =>
            <div className="col-sm-4" key={product._id}>
                <Product product= {product} />
            </div>
        );
        
        return (list); // when rendering something, it needs to be in parens
    }
    
    render() {
        return (
            <div>
                <div className="App">
                    <div className="App-header">
                        <img src={logo} className="App-logo" alt="logo" />
                    </div>
                <h2>Welcome to React</h2>
                </div>
                <div className="container-fluid App-main">
                    <div className="row">
                        <div className="col-sm-8">
                            <div className="row">
                                {this.productList()}
                            </div>
                        </div>
                        <div className="col-sm-4">
                            <WishList />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;

//function App() {
//  return (
//    <div className="cotainer App">
//      <header className="App-header">
//        <img src={logo} className="App-logo" alt="logo" />
//        <p>
//          Edit <code>src/App.js</code> and save to reload.
//        </p>
//        <a
//          className="App-link"
//          href="https://reactjs.org"
//          target="_blank"
//          rel="noopener noreferrer"
//        >
//          Learn React
//        </a>
//      </header>
//    </div>
//  );
//}
//
//export default App;
