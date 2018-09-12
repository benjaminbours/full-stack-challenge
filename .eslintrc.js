module.exports = {
    "extends": "airbnb",
    "parser": "babel-eslint",
    "env": {
        "browser": true,
    },
    "rules": {
        "react/destructuring-assignment": [true, "always", { "ignoreClassFields": true }],
        "react/forbid-prop-types":  false
    }
};