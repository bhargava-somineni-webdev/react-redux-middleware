export default function ({ dispatch }) {
    return next => action => {
        // if action does not have payload
        // or, the payload does not have a .then property
        // we dont care about it, send it on
        if (!action.payload || !action.payload.then) {
            return next(action); //implies send action to the next middleware
        }

        action.payload.then(function (response) {
            //create a new action with old type, but
            // replace the promise with response data
            const newAction = { ...action, payload: response };
            //we are passing the new action to all the middlewares again,
            //instead of next middleware
            dispatch(newAction);
        });
    }
}

     //equivalent ES5 of above code
     //  return function (next) {
     //         return function (action) {            
     //             console.log(action);
     //             next(action); //implies send action to the next middleware
     //         }
    //     }