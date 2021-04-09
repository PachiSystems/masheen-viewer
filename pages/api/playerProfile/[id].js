import {PATH_TO_PLAYER_PROFILES} from "../../../constants/paths";

export default (req, res) => {
    return new Promise((resolve, reject) => {
        const {id} = req.query;
        const fs = require('fs');
        const parser = require('xml2json');

        fs.readFile(`${PATH_TO_PLAYER_PROFILES}/${id}/Stats.xml`, (err, data) => {
            if(err) {
                res.status(500)
                reject();
            }
            const json = JSON.parse(parser.toJson(data, {}));
            res.setHeader('Content-Type', 'application/json');
            res.setHeader('Cache-Control', 'max-age=90');
            res.status(200).json(json.Stats);
            resolve();
        });
    });
}
