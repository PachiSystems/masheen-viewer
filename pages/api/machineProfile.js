import {PATH_TO_MACHINE_PROFILE} from "../../constants/paths";

export default (req, res) => {
    const fs = require('fs');
    const parser = require('xml2json');

    fs.readFile(`${PATH_TO_MACHINE_PROFILE}/Stats.xml`, (err, data) => {
        const json = JSON.parse(parser.toJson(data, {}));
        res.status(200).json(json.Stats);
    });
}
