const categoryValidator = (req, res, next) => { 
    if (req.body) {
        if (!req.body.categoryName && !req.body.gender) {
            res
            .status(400)
            .setHeader('Content-Type', 'application/json')
            .json({ success: false, msg: 'Missing required fields!'})

        }
        else {
            next();
        }

    }
}


const userValidator = (req, res, next) => {
    if (req.body) {
        if (

            !req.body.userName  ||
            !req.body.gender ||
            !req.body.firstName ||
            !req.body.lastName ||
            !req.body.email ||
            !req.body.password ||
            !req.body.phoneNumber
        )
        {
            res
            .status(400)
            .setHeader('Content-Type', 'application/json')
            .json({ success: false, msg: 'Missing required fields!'})        
        }
            else 
            {
                next();
            }

    }
}


//validate item before POST

const itemValidator = (req, res, next) => {
    if (req.body) {
        if (
            !req.body.itemDescription ||
            !req.body.gender ||
            !req.body.price ||
            !req.body.category ||
            !req.body.colors ||
            !req.body.sizes
        ) {
            res
            .status(400)
            .setHeader('Content-Type', 'application/json')
            .json({ success: false, msg: 'Missing required fields!'})    

        }
        else 
        {
            next();
        }
    }
}

module.exports = {
    categoryValidator,
    userValidator,
    itemValidator
}

//params, body, query