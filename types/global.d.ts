import {IAlert} from "../states/alert/state";
import {IProfile} from "../states/profile/state";

type State = {
    alert: IAlert,
    profile?: IProfile
}
