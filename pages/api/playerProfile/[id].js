import {PATH_TO_PLAYER_PROFILES} from "../../../constants/paths";

export default (req, res) => {
    const {id} = req.query;
    const fs = require('fs');
    const parser = require('xml2json');

    fs.readFile(`${PATH_TO_PLAYER_PROFILES}/${id}/Stats.xml`, (err, data) => {
        const json = JSON.parse(parser.toJson(data, {}));
        res.status(200).json(json.Stats);
    });
}
