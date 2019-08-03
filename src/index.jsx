
import "reflect-metadata";
import "babel-core/register";
import "babel-polyfill";
import { Observer } from 'mobx-react';
import React from 'react';
import * as ReactDOM from 'react-dom';
//import mainVM from './Main.ViewModel';

import { polyfill } from 'es6-promise';
polyfill();


// const button = (onClick, text, forceDisable = false) =>
//     (<button key={text} onClick={onClick} disabled={mainVM.orderInProgress || forceDisable}>
//         {text}
//     </button>);

// const MainView = () => (<Observer>{() => {

//     let orderStatus = 'unknown';

//     if (mainVM.orderInProgress === true) {
//         orderStatus = 'waiting';
//     } else if (mainVM.orderPlaced === true) {
//         orderStatus = 'placed';
//     } else if (mainVM.orderPlaced === false) {
//         orderStatus = 'not placed';
//     }

//     return <>

//         <p>You want to order {mainVM.beersToOrder} beers</p>
//         <div>
//             {mainVM.message}
//         </div>
//         <br />
//         {[
//             button(mainVM.moreBeer, "More beer!"),
//             button(mainVM.lessBeer, "Less beer :-(", mainVM.beersToOrder < 1),
//         ]}
//         <br />
//         <br />
//         <div>
//             Order status: {orderStatus}
//         </div>

//     </>
// }
// }</Observer>);

// ReactDOM.render(<MainView />, document.getElementById('root'));




import(/* webpackChunkName: "Main.ViewModel" */ './Main.ViewModel')
    .then((mainVMmodule) => {

        const mainVM = mainVMmodule.mainVMDefaultInstance;

        const button = (onClick, text, forceDisable = false) =>
            (<button key={text} onClick={onClick} disabled={mainVM.orderInProgress || forceDisable}>
                {text}
            </button>);

        const MainView = () => (<Observer>{() => {

            let orderStatus = 'unknown';

            if (mainVM.orderInProgress === true) {
                orderStatus = 'waiting';
            } else if (mainVM.orderPlaced === true) {
                orderStatus = 'placed';
            } else if (mainVM.orderPlaced === false) {
                orderStatus = 'not placed';
            }

            return <>

                <p>You want to order {mainVM.beersToOrder} beers</p>
                <div>
                    {mainVM.message}
                </div>
                <br />
                {[
                    button(mainVM.moreBeer, "More beer!"),
                    button(mainVM.lessBeer, "Less beer :-(", mainVM.beersToOrder < 1),
                ]}
                <br />
                <br />
                <div>
                    Order status: {orderStatus}
                </div>

            </>
        }
        }</Observer>);

        ReactDOM.render(<MainView />, document.getElementById('root'));
    });
