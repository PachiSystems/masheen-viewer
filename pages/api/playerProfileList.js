/* GET stats profile. */
import {PATH_TO_PLAYER_PROFILES} from "../../constants/paths";

export default (req, res) => {
    const fs = require('fs');
    const ini = require('ini');
    const getDirectories = source => fs.readdirSync(source, {withFileTypes: true})
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);
    let profileNames = [];
    const localProfileDirs = getDirectories(PATH_TO_PLAYER_PROFILES);
    for(let i=0;i<localProfileDirs.length; i++) {
        const config = ini.parse(fs.readFileSync(`${PATH_TO_PLAYER_PROFILES}/${localProfileDirs[i]}/Editable.ini`, 'utf-8'));
        profileNames.push({
            displayName: config.Editable.DisplayName,
            profileID: localProfileDirs[i]
        });
    }
    res.send(profileNames);
}
