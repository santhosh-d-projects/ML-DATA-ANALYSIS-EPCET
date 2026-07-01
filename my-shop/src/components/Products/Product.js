import React, { Component } from 'react';
import img1 from '../images/pizza.jpg';
import img2 from '../images/img2.jpg';
import img3 from '../images/img3.jpg';
import img4 from '../images/img4.jpg';
import img5 from '../images/img5.jpg';
import img6 from '../images/img6.jpg';
import './Product.css';

const products = [
    
    
    {
          
        item: (
        	
            <div className="div1">
                <img src={img1} alt="img1"  />
            </div>
        ), 
        name: 'Pizza',
        price: 500

        
    },
   
    {
        item: (
            <div className="div3">
                <img src={img2} alt="img2"  />
                
            </div>
        ), 
        name: 'Manchurian',
        price: 200
    },
     {
        item: (
            <div className="div4">
                <img src={img3} alt="img"  />
            </div>
        ), 
        name: 'Paneer Chilli',
        price: 400
    },
    {
        item: (
            <div className="div5">
                <img src={img4} alt="img4" />
            </div>
        ), 
        name: 'Noodles',
        price: 300
    },

   {
        item: (
            <div className="div6">
                <img src={img5} alt="img5"  />
            </div>
        ), 
        name: 'Vada Pav',
        price: 100
    },
    {
        item: (
            <div className="div7">
                <img src={img6} alt="img6"  />
            </div>
        ), 
        name: 'Grill Paneer chilli',
        price: 600
    },
    
];





export default class Product extends Component {
	state = {
		cart: [],
		total: 0
	}

	add = (product) => {
		this.setState(state => ({
			cart: [...state.cart, product.name],
			total: state.total + product.price
		}));
	}

	remove = (product) => {
		this.setState(state => {
			const cart = [...state.cart];
			const index = cart.indexOf(product.name);
			if (index >= 0) {
				cart.splice(index, 1);
				return {
					cart,
					total: state.total - product.price
				};
			}
			return state;
		});
	}

	currencyOptions = {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	}

	getTotal = () => {
		return this.state.total.toLocaleString(undefined, this.currencyOptions);
	}

	render() {
		return (
			<div className="wrapper">

				<div className="main_div">
					<p>Shopping cart: {this.state.cart.length} total items.</p>
				</div>
				<div>Total: {this.getTotal()}</div>
				<div className="div11"></div>
				<div className="div2">
					{products.map(product => (
						<div key={product.name}>
							<div className="product">
								<span role="img" aria-label={product.name}>{product.item}</span>
								{product.name}
							</div>
							<button onClick={() => this.add(product)}>Add</button>
							<button onClick={() => this.remove(product)}>Remove</button>
						</div>
					))}
				</div>
			</div>
		);
	}

	
}
